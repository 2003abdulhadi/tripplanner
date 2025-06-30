"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/utils/prisma/prisma";
import { FormResult } from "@/lib/types";

type AuthError = "missing_data" | "user_already_exists" | "database_error";

type AuthResult = FormResult<AuthError | string | null>;

export async function signin(formData: FormData): Promise<AuthResult> {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (Object.values(data).some((value) => !value)) {
    return { success: false, error: "missing_data" };
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error);
    return { success: false, error: String(error.code) };
  }

  revalidatePath("/", "layout");
  return { success: true, error: null };
}

export async function signup(formData: FormData): Promise<AuthResult> {
  const data = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (await prisma.user.findFirst({ where: { email: data.email } })) {
    return { success: false, error: "user_already_exists" };
  }
  const supabase = await createClient();
  if (Object.values(data).some((value) => !value)) {
    return { success: false, error: "missing_data" };
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp(data);

  if (error) {
    console.error(error);
    return { success: false, error: String(error.code) };
  }

  try {
    await prisma.user.create({
      data: {
        id: user!.user_metadata.sub,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: "database_error" };
  }

  revalidatePath("/", "layout");
  return { success: true, error: null };
}
