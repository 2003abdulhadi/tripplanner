import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ProviderRow } from "@/lib/types";
import EditProviderForm from "./edit-provider-form";
import DeleteProviderForm from "./delete-provider-form";

export interface EditProviderDialogProps {
  provider: ProviderRow;
  currentUser: string;
}

export function EditProviderDialog({
  provider,
  currentUser,
}: EditProviderDialogProps) {
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
          <EditProviderForm provider={provider} currentUser={currentUser} />
          <DeleteProviderForm provider={provider} currentUser={currentUser} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
