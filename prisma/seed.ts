import { Item, PrismaClient, PrismaPromise } from "@prisma/client";
import { ItemCategory } from "@prisma/client";

const prisma = new PrismaClient();
const itemTabs: [Partial<ItemCategory>, Partial<Item>[]][] = [
  [
    {
      slug: "essentials",
      label: "Travel Essentials",
    },
    [
      { name: "Bug Spray", needed: 1 },
      { name: "Sunscreen" },
      { name: "After Bite" },
      { name: "Band Aids", needed: 1 },
      { name: "Advil", needed: 1 },
      { name: "Tylenol", needed: 1 },
      { name: "Batteries" },
      { name: "Bug Lantern" },
      { name: "Folding Chairs", needed: 16 },
      { name: "Flashlights", needed: 4 },
      { name: "Cooler", needed: 2 },
    ],
  ],
  [
    {
      slug: "cooking",
      label: "Cooking Equipment",
    },
    [
      { name: "Grill" },
      { name: "Charcoal", needed: 1 },
      { name: "Lighter Fluid", needed: 1 },
      { name: "Grill Utensils" },
      { name: "Bottle Opener", needed: 1 },
      { name: "Brita", needed: 2 },
    ],
  ],
  [
    {
      slug: "food",
      label: "Food",
    },
    [
      { name: "Burgers", needed: 30 },
      { name: "Hot Dogs", needed: 30 },
      { name: "Chicken", needed: 7, note: "kg" },
      { name: "Corn", needed: 12 },
      { name: "Fruit", note: "assorted" },
      { name: "Cookies", needed: 4, note: "assorted" },
      { name: "Chips", needed: 4, note: "assorted" },
      { name: "Coffee" },
      { name: "Smores", note: "all components" },
      { name: "Frozen Pizza" },
      { name: "Ketchup", needed: 1 },
      { name: "Mustard", needed: 1 },
      { name: "Relish", needed: 1 },
      { name: "Mayo", needed: 1 },
      { name: "Hot Peppers" },
      { name: "Eggs" },
      { name: "Bread" },
    ],
  ],
  [
    {
      slug: "drinks",
      label: "Drinks",
    },
    [
      { name: "Water Bottles", needed: 2, note: "case of 24" },
      { name: "Juice" },
      { name: "Soft Drinks", needed: 3, note: "case of 12 or equivalent" },
      { name: "Ice", needed: 30, note: "kg" },
      { name: "Milk" },
      { name: "Energy Drinks" },
    ],
  ],
  [
    {
      slug: "entertainment",
      label: "Activites and Entertainment",
    },
    [
      { name: "Basketball", needed: 1 },
      { name: "Volleyball", needed: 1 },
      { name: "Frisbee", needed: 1 },
      { name: "Playing Cards", needed: 1 },
      { name: "Beach Ball", needed: 1 },
      { name: "Floaties" },
      { name: "Fire Starters", needed: 1, note: "pack" },
      { name: "Board Games" },
      { name: "Speaker", needed: 1 },
      { name: "Microphones", needed: 1 },
      { name: "Digital Camera", needed: 1 },
      { name: "Beach Tarp" },
    ],
  ],
  [
    {
      slug: "substances",
      label: "Substances",
    },
    [],
  ],
  [
    {
      slug: "misc",
      label: "Miscellaneous",
    },
    [
      { name: "Garbage Bags", needed: 1, note: "pack" },
      { name: "Umbrellas" },
      { name: "Wipes" },
      { name: "Extension Cord" },
      { name: "Air Mattress" },
      { name: "Tool Kit" },
    ],
  ],
];

async function main() {
  const queries: PrismaPromise<any>[] = [];

  for (const [category, items] of itemTabs) {
    // ——— Category upsert ———
    const slug = category.slug!;
    const label = category.label!;
    const description = category.description;

    const itemCategoryData: { label: string; description?: string } = { label };
    if (description != null) {
      itemCategoryData.description = description;
    }

    queries.push(
      prisma.itemCategory.upsert({
        where: { slug },
        update: itemCategoryData,
        create: { slug, ...itemCategoryData },
      })
    );

    // ——— Item upserts ———
    for (const { name, needed, note } of items) {
      if (!name) throw new Error("Seed data missing item.name");

      const itemData: {
        itemCategorySlug: string;
        needed?: number;
        note?: string;
      } = { itemCategorySlug: slug };

      if (needed != null) {
        itemData.needed = needed;
      }
      if (note != null) {
        itemData.note = note;
      }

      queries.push(
        prisma.item.upsert({
          where: { name },
          update: itemData,
          create: { name, ...itemData },
        })
      );
    }
  }

  await prisma.$transaction(queries);
  console.log(`Upserted ${queries.length} records.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
