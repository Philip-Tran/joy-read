/*
  Warnings:

  - You are about to drop the `book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sen_flow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_setting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sen_flow" DROP CONSTRAINT "sen_flow_bookId_fkey";

-- DropTable
DROP TABLE "book";

-- DropTable
DROP TABLE "sen_flow";

-- DropTable
DROP TABLE "user_setting";

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "audioUrlSer" TEXT,
    "audioUrlOnl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SenFlow" (
    "id" SERIAL NOT NULL,
    "frontText" TEXT NOT NULL,
    "backText" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,

    CONSTRAINT "SenFlow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" SERIAL NOT NULL,
    "usePopupTranslate" BOOLEAN NOT NULL DEFAULT true,
    "interfaceLanguage" TEXT NOT NULL DEFAULT 'en',
    "learningLanguage" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SenFlow" ADD CONSTRAINT "SenFlow_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
