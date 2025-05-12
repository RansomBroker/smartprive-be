import { prisma } from "@/lib/prisma";

export async function GET(_, { params }) {
  try {
    const prestasi = await prisma.prestasi.findUnique({
      where: { id: parseInt(params.id) },
      include: { user: true },
    });

    if (!prestasi) {
      return Response.json(
        { error: "Prestasi tidak ditemukan" },
        { status: 404 }
      );
    }

    return Response.json(prestasi);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const body = await req.json();

  try {
    const updatedPrestasi = await prisma.prestasi.update({
      where: { id: parseInt(params.id) },
      data: {
        name: body.name,
        userId: body.userId,
      },
    });

    return Response.json(updatedPrestasi);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await prisma.prestasi.delete({
      where: { id: parseInt(params.id) },
    });

    return Response.json({ message: "Prestasi berhasil dihapus" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
