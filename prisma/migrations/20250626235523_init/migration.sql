-- CreateTable
CREATE TABLE "Item" (
    "name" TEXT NOT NULL,
    "needed" INTEGER NOT NULL DEFAULT 0,
    "note" TEXT,
    "itemCategorySlug" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "ItemCategory" (
    "label" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ItemCategory_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "Provider" (
    "itemName" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("userId","itemName")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_itemCategorySlug_fkey" FOREIGN KEY ("itemCategorySlug") REFERENCES "ItemCategory"("slug") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_itemName_fkey" FOREIGN KEY ("itemName") REFERENCES "Item"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
