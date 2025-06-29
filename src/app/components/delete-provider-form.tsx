import { deleteProvider } from "./actions";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { EditProviderDialogProps } from "./edit-provider-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function DeleteProviderForm({
  provider,
  currentUser,
}: EditProviderDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const { success, error } = await deleteProvider(formData);
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
      <input type="hidden" name="description" value={provider.description} />
      <Button variant="destructive" type="submit" disabled={loading}>
        {loading ? "Deleting..." : "Delete"}
      </Button>
    </form>
  );
}

export default DeleteProviderForm;
