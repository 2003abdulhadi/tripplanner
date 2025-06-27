import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "./button";
import { redirect } from "next/navigation";

async function signOutAction() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex items-center p-4 gap-2">
      <h1 className="font-black tracking-wide text-2xl grow">
        Trip Planner - Carleton (and extras) Cottage 2025
      </h1>
      {user ? (
        <form action={signOutAction}>
          <Button type="submit">Sign Out</Button>
        </form>
      ) : (
        <Link href={"/auth"}>
          <Button>Log In</Button>
        </Link>
      )}
    </div>
  );
}
