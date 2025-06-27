"use server";

import prisma from "@/utils/prisma/prisma";
import { createClient } from "@/utils/supabase/server";
import { Item } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createItem(formData: FormData) {
  const supabase = await createClient();

  // authenticate user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/error`);
  }

  // parse form
  const data = {
    name: formData.get("name") as string,
    needed: formData.get("needed") as string,
    itemCategorySlug: formData.get("itemCategorySlug") as string,
    note: formData.get("note") as string,
  };

  console.log(data);

  // validate contents
  if (!data.name || !data.needed || !data.itemCategorySlug) {
    redirect(`/error`);
  }

  // check for duplicates
  if (await prisma?.item.findFirst({ where: { name: data.name } })) {
    redirect("/");
  }

  // create item
  const payload: Item = {
    name: data.name,
    needed: +data.needed,
    itemCategorySlug: data.itemCategorySlug,
    note: data.note ?? null,
  };

  await prisma?.item.create({
    data: payload,
  });

  revalidatePath("/", "layout");
  redirect("/");
}

export async function addProvider(formData: FormData) {
  // 1) pull the fields out
  const itemName = formData.get("itemName") as string;
  const quantity = Number(formData.get("quantity"));
  const description = formData.get("description") as string | undefined;

  // 2) get the current user
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    throw new Error("You must be signed in to add a provider");
  }

  // 3) insert into Prisma
  await prisma?.provider.create({
    data: {
      itemName,
      userId: user.id,
      quantity,
      description,
    },
  });

  // 4) optionally, re-validate/cache or redirect
  redirect("/"); // or wherever makes sense
}

export async function updateProvider(formData: FormData) {
  const userId = formData.get("userId") as string;
  const itemName = formData.get("itemName") as string;
  const quantity = Number(formData.get("quantity"));
  const description = formData.get("description") as string | undefined;

  await prisma?.provider.update({
    where: { userId_itemName: { userId, itemName } },
    data: { quantity, description },
  });

  // re-render this page’s data:
  revalidatePath("/");
}

export async function deleteProvider(formData: FormData) {
  const userId = formData.get("userId") as string;
  const itemName = formData.get("itemName") as string;

  await prisma?.provider.delete({
    where: { userId_itemName: { userId, itemName } },
  });

  revalidatePath("/");
}
