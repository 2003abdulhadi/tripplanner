"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addItem } from "./actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AddItemButtonProps } from "./add-item";

function AddItemForm({ itemCategories, onSuccess }: AddItemButtonProps & { onSuccess?: () => void }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const { success, error } = await addItem(formData);
      if (success) {
        if (onSuccess) onSuccess();
        router.push("/");
      } else {
        setError(error as string);
      }
    } catch (err) {
      setError(err as string);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (error) {
      toast(`Error: ${error}`);
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Item"}
      </Button>
    </form>
  );
}

export default AddItemForm;
