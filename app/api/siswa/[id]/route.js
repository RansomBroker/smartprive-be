import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  const { id } = params;

  try {
const siswa = await prisma.user.findFirst({
  where: {
    id: parseInt(id),
    level: "siswa",
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

    if (!siswa) {
      return NextResponse.json({ message: "Siswa tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(siswa);
  } catch (error) {
    console.error("API error di /api/siswa/[id]:", error); // Tambahkan ini
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
