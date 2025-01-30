/*
  Warnings:

  - You are about to drop the column `avatarUrl` on the `Setting` table. All the data in the column will be lost.
  - Added the required column `translateToLanguage` to the `Setting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Setting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Setting" DROP COLUMN "avatarUrl",
ADD COLUMN     "translateToLanguage" TEXT NOT NULL,
ADD COLUMN     "userId" UUID NOT NULL;
