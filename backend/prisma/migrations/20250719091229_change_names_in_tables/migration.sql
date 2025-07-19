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
CREATE TABLE "_EventToShopper" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EventToShopper_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_EventToShopper_B_index" ON "_EventToShopper"("B");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToShopper" ADD CONSTRAINT "_EventToShopper_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToShopper" ADD CONSTRAINT "_EventToShopper_B_fkey" FOREIGN KEY ("B") REFERENCES "Shopper"("id") ON DELETE CASCADE ON UPDATE CASCADE;
