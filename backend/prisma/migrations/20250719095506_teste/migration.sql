/*
  Warnings:

  - You are about to drop the column `eventOwnerId` on the `Event` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_eventOwnerId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "eventOwnerId",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ShopperEvent" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shopperId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "ShopperEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShopperEvent_shopperId_eventId_key" ON "ShopperEvent"("shopperId", "eventId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopperEvent" ADD CONSTRAINT "ShopperEvent_shopperId_fkey" FOREIGN KEY ("shopperId") REFERENCES "Shopper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopperEvent" ADD CONSTRAINT "ShopperEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
