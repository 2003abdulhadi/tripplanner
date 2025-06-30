"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddItemForm from "./add-item-form";
import { ItemCategory } from "@prisma/client";
import { Fragment, useState } from "react";

export type AddItemButtonProps = {
  itemCategories: ItemCategory[];
};

export function AddItemButton({ itemCategories }: AddItemButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="sticky self-end z-10 rounded-full p-3 shadow-lg left-0 bottom-6 ml-4 mb-1"
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
            <AddItemForm
              itemCategories={itemCategories}
              onSuccess={() => setOpen(false)}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
