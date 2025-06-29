"use client";

import { useEffect, useState } from "react";
import { signin } from "../actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const { success, error } = await signin(formData);
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <Label htmlFor="email">Email: </Label>
      <Input id="email" type="email" name="email" required />
      <Label htmlFor="password">Password: </Label>
      <Input id="password" type="password" name="password" required />
      {loading ? (
        <Button type="submit" disabled>
          Signing in...
        </Button>
      ) : (
        <Button type="submit">Sign in</Button>
      )}
    </form>
  );
}
