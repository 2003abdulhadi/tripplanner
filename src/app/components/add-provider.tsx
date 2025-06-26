import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { addProvider } from "./actions";

interface ProvideItemButtonProps {
  itemName: string;
}

export default function ProvideItemButton({
  itemName,
}: ProvideItemButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="absolute top-0 right-0 z-10 rounded-full p-2.5 shadow-lg w-0 h-0 font-black"
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
          <form action={addProvider} className="flex flex-col gap-4">
            <input type="hidden" name="itemName" value={itemName} />
            <div className="flex flex-col">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min={1}
                defaultValue={1}
                required
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="description">Notes (optional)</Label>
              <Input id="description" name="description" type="text" />
            </div>

            <Button type="submit" className="self-end">
              Add Me
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
