/*
  Warnings:

  - You are about to drop the column `eventManagerId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Shopper` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Added the required column `eventOwnerId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_eventManagerId_fkey";

-- DropForeignKey
ALTER TABLE "Shopper" DROP CONSTRAINT "Shopper_userId_fkey";

-- DropIndex
DROP INDEX "Shopper_userId_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "eventManagerId",
ADD COLUMN     "eventOwnerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "status" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Shopper" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Owner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_eventOwnerId_fkey" FOREIGN KEY ("eventOwnerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
