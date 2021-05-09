-- CreateTable
CREATE TABLE "Setting" (
    "id" SERIAL NOT NULL,
    "keys" TEXT NOT NULL,
    "values" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Antrian" (
    "id" SERIAL NOT NULL,
    "operator" INTEGER NOT NULL,
    "nomor" INTEGER NOT NULL,
    "kode" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "nopol" TEXT NOT NULL,
    "jarak" TEXT NOT NULL,
    "stat_book" TEXT NOT NULL,
    "member" TEXT NOT NULL,
    "antrian" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Setting.keys_unique" ON "Setting"("keys");

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");
