import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  const { id } = params;

  try {
const guru = await prisma.user.findFirst({
  where: {
    id: parseInt(id),
    level: "guru",
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

    if (!guru) {
      return NextResponse.json({ message: "Guru tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(guru);
  } catch (error) {
    console.error("API error di /api/guru/[id]:", error); // Tambahkan ini
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
