import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  const { id } = params;

  try {
const admin = await prisma.user.findFirst({
  where: {
    id: parseInt(id),
    level: "admin",
  },
  select: {
    id: true,
    username: true,
    name: true,
    level: true,
    nohp: true,
    alamat: true,
    kelas: true,
    createdAt: true,
  },
});

    if (!admin) {
      return NextResponse.json({ message: "Admin tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(admin);
  } catch (error) {
    console.error("API error di /api/admin/[id]:", error); // Tambahkan ini
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
