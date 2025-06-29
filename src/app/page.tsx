import prisma from "@/utils/prisma/prisma";
import { createClient } from "@/utils/supabase/server";
import { ItemTable } from "./components/item-table";
import { ItemRow, ProviderRow } from "@/lib/types";
import { AddItemButton } from "./components/add-item";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const itemCategories = await prisma.itemCategory.findMany({
    select: { slug: true, label: true, description: true },
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
          items={[...items]}
          currentUser={user?.id}
        />
        <AddItemButton itemCategories={[...itemCategories]} />
        {/* {user && } */}
      </div>
    </div>
  );
}
