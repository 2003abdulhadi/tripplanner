"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { ProviderRow } from "@/lib/types";
import { deleteProvider, updateProvider } from "./actions";

interface EditProviderDialogProps {
  provider: ProviderRow;
  currentUser: string;
}

export function EditProviderDialog({
  provider,
  currentUser,
}: EditProviderDialogProps) {
  const [quantity, setQuantity] = useState(provider.quantity);
  const [description, setDescription] = useState(provider.description ?? "");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="ml-2">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Your Providing</DialogTitle>
          <DialogDescription>
            Update quantity or notes, or remove yourself.
          </DialogDescription>
        </DialogHeader>

        <form action={updateProvider} className="flex flex-col gap-4">
          <input type="hidden" name="userId" value={currentUser} />
          <input type="hidden" name="itemName" value={provider.itemName} />

          <div className="flex flex-col">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="description">Notes</Label>
            <Input
              id="description"
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button type="submit">Save</Button>
        </form>
        <div className="flex justify-between">
          {/* Delete form */}
          <form action={deleteProvider}>
            <input type="hidden" name="userId" value={currentUser} />
            <input type="hidden" name="itemName" value={provider.itemName} />
            <Button variant="destructive" type="submit">
              Delete
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
