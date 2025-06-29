"use server";

import { FormResult } from "@/lib/types";
import prisma from "@/utils/prisma/prisma";
import { createClient } from "@/utils/supabase/server";
import { Item, Provider } from "@prisma/client";
import { revalidatePath } from "next/cache";

type ItemError = "missing_data" | "item_already_exists" | "database_error";

type ItemResult = FormResult<ItemError | string | null>;

export async function addItem(formData: FormData): Promise<ItemResult> {
  const supabase = await createClient();

  // authenticate user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "user_not_authenticated",
    };
  }

  // parse form
  const data = {
    name: formData.get("name") as string,
    needed: formData.get("needed") as string,
    itemCategorySlug: formData.get("itemCategorySlug") as string,
    note: formData.get("note") as string,
  };

  // validate contents
  if (!data.name || !data.needed || !data.itemCategorySlug) {
    return {
      success: false,
      error: "missing_data",
    };
  }

  // check for duplicates
  if (await prisma.item.findFirst({ where: { name: data.name } })) {
    return {
      success: false,
      error: "item_already_exists",
    };
  }

  // create item
  const payload: Item = {
    name: data.name,
    needed: +data.needed,
    itemCategorySlug: data.itemCategorySlug,
    note: data.note ?? null,
  };

  try {
    await prisma.item.create({
      data: payload,
    });
  } catch (error) {
    return {
      success: false,
      error: "database_error",
    };
  }

  revalidatePath("/", "layout");
  return { success: true, error: null };
}

export async function addProvider(formData: FormData): Promise<FormResult> {
  const supabase = await createClient();

  // authenticate user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "user_not_authenticated",
    };
  }

  // parse form
  const data = {
    itemName: formData.get("itemName") as string,
    quantity: formData.get("quantity") as string,
    description: (formData.get("description") as string) ?? "",
  };

  // validate contents
  if (!data.itemName || !data.quantity) {
    return {
      success: false,
      error: "missing_data",
    };
  }

  // check for duplicates
  if (
    await prisma.provider.findFirst({
      where: {
        itemName: data.itemName,
        userId: user.id,
        description: data.description,
      },
    })
  ) {
    return {
      success: false,
      error: "item_already_exists",
    };
  }

  // create item
  const payload: Provider = {
    userId: user.id,
    itemName: data.itemName,
    quantity: +data.quantity,
    description: data.description,
  };

  try {
    await prisma.provider.create({
      data: payload,
    });
  } catch (error) {
    console.error("Error creating provider:", error);
    return {
      success: false,
      error: "database_error",
    };
  }

  revalidatePath("/", "layout");
  return { success: true, error: null };
}

export async function updateProvider(formData: FormData) {
  const supabase = await createClient();

  // authenticate user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "user_not_authenticated",
    };
  }

  // parse form
  const data = {
    userId: formData.get("userId") as string,
    itemName: formData.get("itemName") as string,
    currentQuantity: Number(formData.get("currentQuantity")),
    currentDescription: (formData.get("currentDescription") as string) ?? "",
    newQuantity: Number(formData.get("newQuantity")),
    newDescription: (formData.get("newDescription") as string) ?? "",
  };

  console.log("Update Provider Data:", data);

  // validate contents
  if (!data.newQuantity) {
    return {
      success: false,
      error: "missing_data",
    };
  }

  // check for duplicates if we are changing description
  if (data.newDescription !== data.currentDescription) {
    if (
      await prisma.provider.findFirst({
        where: {
          itemName: data.itemName,
          userId: user.id,
          description: data.newDescription,
        },
      })
    ) {
      return {
        success: false,
        error: "item_already_exists",
      };
    }
  }

  // create item
  const payload: Provider = {
    userId: user.id,
    itemName: data.itemName,
    quantity: +data.newQuantity,
    description: data.newDescription,
  };

  try {
    await prisma.provider.upsert({
      where: {
        userId_itemName_description: {
          userId: user.id,
          itemName: data.itemName,
          description: data.currentDescription,
        },
      },
      create: payload,
      update: payload,
    });
  } catch (error) {
    return {
      success: false,
      error: "database_error",
    };
  }

  revalidatePath("/", "layout");
  return { success: true, error: null };
}

export async function deleteProvider(formData: FormData) {
  const supabase = await createClient();

  // authenticate user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "user_not_authenticated",
    };
  }

  // parse form
  const data = {
    userId: formData.get("userId") as string,
    itemName: formData.get("itemName") as string,
    quantity: Number(formData.get("quantity")),
    description: (formData.get("description") as string) ?? "",
  };

  // create item
  const payload: Provider = {
    userId: user.id,
    itemName: data.itemName,
    quantity: +data.quantity,
    description: data.description,
  };

  try {
    await prisma.provider.delete({
      where: {
        userId_itemName_description: {
          userId: user.id,
          itemName: data.itemName,
          description: data.description,
        },
      },
    });
  } catch (error) {
    console.log("Error deleting provider:", error);
    return {
      success: false,
      error: "database_error",
    };
  }

  revalidatePath("/", "layout");
  return { success: true, error: null };
}
