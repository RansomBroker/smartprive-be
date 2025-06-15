const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Delete from child tables first to avoid foreign key constraint errors
  await prisma.rapot.deleteMany();
  await prisma.absensi.deleteMany();
  await prisma.soal.deleteMany();
  await prisma.user.deleteMany();

  console.log("All data reset!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
