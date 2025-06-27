import prisma from "@/utils/prisma/prisma";
import { createClient } from "@/utils/supabase/server";
import { ItemTable } from "./components/item-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ItemRow, ProviderRow } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createItem } from "./components/actions";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const itemCategories = await prisma.itemCategory.findMany({
    select: { slug: true, label: true },
  });

  const rawItems = await prisma.item.findMany({
    include: { Provider: { include: { User: true } } },
  });

  const items: ItemRow[] = rawItems.map((item) => ({
    name: item.name,
    needed: item.needed,
    note: item.note ?? undefined,
    itemCategorySlug: item.itemCategorySlug ?? undefined,
    Provider: item.Provider.map<ProviderRow>((p) => ({
      userId: p.userId,
      userName: `${p.User.firstName} ${p.User.lastName}`,
      quantity: p.quantity,
      description: p.description ?? undefined,
      itemName: p.itemName,
    })),
  }));

  return (
    <div className="flex-auto px-4 flex">
      <div className="relative flex-auto flex">
        <ItemTable
          itemCategories={itemCategories}
          items={items}
          currentUser={user?.id}
        />

        {user ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="absolute bottom-4 right-4 z-10 rounded-full p-4 shadow-lg w-0 h-0 font-black"
                aria-label="Add item"
              >
                +
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Item</DialogTitle>
                <DialogDescription>
                  Create a new item to add to the list
                </DialogDescription>
                <form action={createItem} className="flex flex-col gap-2">
                  <Label htmlFor="name">Item Name: </Label>
                  <Input id="name" type="text" name="name" required />
                  <Label htmlFor="needed">Quantity Needed: </Label>
                  <Input
                    id="needed"
                    type="number"
                    name="needed"
                    min={0}
                    defaultValue={0}
                    required
                  />
                  <Label htmlFor="itemCategorySlug">Category: </Label>
                  <Select name="itemCategorySlug" required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {itemCategories.map(({ slug, label }) => (
                        <SelectItem key={slug} value={slug}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Label htmlFor="note">
                    Note <em>(optional):</em>
                  </Label>
                  <Input id="note" type="text" name="note" />
                  <Button>Add Item</Button>
                </form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
