import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const soal = await prisma.soal.findUnique({
      where: { id: parseInt(id) },
    });

    if (!soal) {
      return NextResponse.json({ error: "Soal not found" }, { status: 404 });
    }

    return NextResponse.json(soal);
  } catch (error) {
    console.error("Error fetching soal:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { link_soal, kelas, judul, mapel } = await request.json();

    if (!link_soal || !kelas || !judul || !mapel) {
      return NextResponse.json(
        { error: "link_soal, kelas, judul, and mapel are required" },
        { status: 400 }
      );
    }

    const updatedSoal = await prisma.soal.update({
      where: { id: parseInt(id) },
      data: {
        link_soal,
        kelas,
        judul,
        mapel,
      },
    });

    return NextResponse.json(updatedSoal);
  } catch (error) {
    console.error("Error updating soal:", error);
    if (error.code === "P2025") {
      // Prisma error code for record not found
      return NextResponse.json({ error: "Soal not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await prisma.soal.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Soal deleted successfully" });
  } catch (error) {
    console.error("Error deleting soal:", error);
    if (error.code === "P2025") {
      // Prisma error code for record not found
      return NextResponse.json({ error: "Soal not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
