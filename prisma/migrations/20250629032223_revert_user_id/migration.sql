/*
  Warnings:

  - The primary key for the `Provider` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Provider` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Provider` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Provider_itemName_idx";

-- DropIndex
DROP INDEX "Provider_userId_idx";

-- AlterTable
ALTER TABLE "Provider" DROP CONSTRAINT "Provider_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
ADD CONSTRAINT "Provider_pkey" PRIMARY KEY ("userId", "itemName");
