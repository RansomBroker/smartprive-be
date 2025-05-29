import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const soal = await prisma.soal.findMany();
    return NextResponse.json(soal);
  } catch (error) {
    console.error("Error fetching soal:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { link_soal, kelas, judul, mapel } = await request.json();

    if (!link_soal || !kelas || !judul || !mapel) {
      return NextResponse.json(
        { error: "link_soal, kelas, judul, and mapel are required" },
        { status: 400 }
      );
    }

    const newSoal = await prisma.soal.create({
      data: {
        link_soal,
        kelas,
        judul,
        mapel,
      },
    });

    return NextResponse.json(newSoal, { status: 201 });
  } catch (error) {
    console.error("Error creating soal:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
