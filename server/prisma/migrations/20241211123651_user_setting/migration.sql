-- CreateTable
CREATE TABLE "Setting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usePopupTranslate" BOOLEAN NOT NULL DEFAULT true,
    "interfaceLanguage" TEXT NOT NULL DEFAULT 'en',
    "learningLanguage" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL
);
