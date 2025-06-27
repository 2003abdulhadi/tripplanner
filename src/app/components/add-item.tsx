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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { createItem } from "./actions";

interface FloatingAddItemButtonProps {
  categories: { slug: string; label: string }[];
}

export function AddItemButton({ categories }: FloatingAddItemButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="sticky self-end bottom-6 right-6 z-10 rounded-full p-3 shadow-lg"
          style={{ marginLeft: "calc(var(--spacing) * -8.4)", marginBottom: "calc(var(--spacing) * 2)" }}
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
                {categories.map(({ slug, label }) => (
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
  );
}
