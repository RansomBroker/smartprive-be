-- CreateEnum
CREATE TYPE "Status" AS ENUM ('H', 'I', 'S');

-- CreateTable
CREATE TABLE "Absensi" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "absensiDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Absensi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
