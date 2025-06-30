"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { addProvider } from "./actions";
import { ProvideItemButtonProps } from "./add-provider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function AddProviderForm({
  itemName,
  onSuccess,
}: ProvideItemButtonProps & { onSuccess?: () => void }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const { success, error } = await addProvider(formData);
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="hidden" name="itemName" value={itemName} />
      <Label htmlFor="quantity">Quantity</Label>
      <Input
        id="quantity"
        name="quantity"
        type="number"
        min={1}
        defaultValue={1}
        required
      />
      <Label htmlFor="description">Notes (optional)</Label>
      <Input id="description" name="description" type="text" />

      {loading ? (
        <Button type="submit" disabled>
          Registering...
        </Button>
      ) : (
        <Button type="submit">Provide item</Button>
      )}
    </form>
  );
}

export default AddProviderForm;
