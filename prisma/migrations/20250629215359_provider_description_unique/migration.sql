/*
  Warnings:

  - The primary key for the `Provider` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `description` on table `Provider` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Provider" DROP CONSTRAINT "Provider_pkey",
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT '',
ADD CONSTRAINT "Provider_pkey" PRIMARY KEY ("userId", "itemName", "description");
