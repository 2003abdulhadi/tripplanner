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
import { Fragment } from "react";

export type AddItemButtonProps = {
  itemCategories: ItemCategory[];
};

export function AddItemButton({ itemCategories }: AddItemButtonProps) {
  return (
    <Fragment>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="sticky self-end bottom-6 right-6 z-10 rounded-full p-3 shadow-lg"
            style={{
              marginLeft: "calc(var(--spacing) * -8.4)",
              marginBottom: "calc(var(--spacing) * 2)",
            }}
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
            <AddItemForm itemCategories={itemCategories} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
