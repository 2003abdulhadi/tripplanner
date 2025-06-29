import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddProviderForm from "./add-provider-form";

export interface ProvideItemButtonProps {
  itemName: string;
}

export default function ProvideItemButton({
  itemName,
}: ProvideItemButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <DialogTitle>Provide {itemName}</DialogTitle>
          <DialogDescription>
            Let everyone know that you're bringing {itemName} to this trip
          </DialogDescription>
          <AddProviderForm
            itemName={itemName}
            onSuccess={() => setOpen(false)}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
