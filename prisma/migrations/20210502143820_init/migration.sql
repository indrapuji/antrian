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
    "alias" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Setting.keys_unique" ON "Setting"("keys");

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");
