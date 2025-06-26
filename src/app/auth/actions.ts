"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/utils/prisma/prisma";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (Object.values(data).some((value) => !value)) {
    redirect("/error");
  }
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const data = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (await prisma.user.findFirst({ where: { email: data.email } })) {
    redirect("/error");
  }
  const supabase = await createClient();
  if (Object.values(data).some((value) => !value)) {
    redirect("/error");
  }

  const {
    data: { user, session },
    error,
  } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  await prisma.user.create({
    data: {
      id: user!.user_metadata.sub,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    },
  });

  revalidatePath("/", "layout");
  redirect("/");
}
