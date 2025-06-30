import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateProvider } from "./actions";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { EditProviderDialogProps } from "./edit-provider-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function EditProviderForm({ provider, currentUser }: EditProviderDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const { success, error } = await updateProvider(formData);
      if (success) {
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
      <input type="hidden" name="userId" value={currentUser} />
      <input type="hidden" name="itemName" value={provider.itemName} />
      <input type="hidden" name="currentQuantity" value={provider.quantity} />
      <input
        type="hidden"
        name="currentDescription"
        value={provider.description}
      />

      <Label htmlFor="newQuantity">Quantity</Label>
      <Input
        id="newQuantity"
        name="newQuantity"
        type="number"
        min={1}
        defaultValue={provider.quantity}
      />

      <Label htmlFor="newDescription">Notes</Label>
      <Input
        id="newDescription"
        name="newDescription"
        type="text"
        defaultValue={provider.description}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}

export default EditProviderForm;
