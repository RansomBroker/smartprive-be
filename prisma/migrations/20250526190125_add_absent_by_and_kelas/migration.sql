/*
  Warnings:

  - Added the required column `absentById` to the `Absensi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Absensi" ADD COLUMN     "absentById" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "kelas" TEXT;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_absentById_fkey" FOREIGN KEY ("absentById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
