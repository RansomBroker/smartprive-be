import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/app/middleware/middleware";

export async function GET(_, { params }) {
  const auth = await authMiddleware(_);
  if (!auth) {
    return Response.json({ error: "Unauthorized" }, { status: auth.status });
  }

  try {
    const rapot = await prisma.rapot.findUnique({
      where: { id: parseInt(params.id) },
      include: { user: true },
    });

    if (!rapot) {
      return Response.json({ error: "Rapot tidak ditemukan" }, { status: 404 });
    }

    return Response.json(rapot);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const auth = await authMiddleware(req);
  if (!auth) {
    return Response.json({ error: "Unauthorized" }, { status: auth.status });
  }

  const body = await req.json();

  try {
    const updatedRapot = await prisma.rapot.update({
      where: { id: parseInt(params.id) },
      data: {
        siswa_id: body.siswa_id,
        mapel: body.mapel,
        nilai: body.nilai,
        bab: body.bab,
        semester: body.semester,
        catatan: body.catatan,
      },
    });

    return Response.json(updatedRapot);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await prisma.rapot.delete({
      where: { id: parseInt(params.id) },
    });

    return Response.json({ message: "Rapot berhasil dihapus" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
