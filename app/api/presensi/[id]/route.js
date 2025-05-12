import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/app/middleware/middleware";

export async function GET(_, { params }) {
  const auth = await authMiddleware(_);

  if (!auth) {
    return Response.json({ error: "Unauthorized" }, { status: auth.status });
  }

  try {
    const data = await prisma.absensi.findUnique({
      where: { id: parseInt(params.id) },
      include: { user: true },
    });

    if (!data) {
      return Response.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }

    return Response.json(data);
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
    const updated = await prisma.absensi.update({
      where: { id: parseInt(params.id) },
      data: {
        userId: body.userId,
        status: body.status,
        absensiDate: body.absensiDate ? new Date(body.absensiDate) : undefined,
      },
    });

    return Response.json(updated);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await prisma.absensi.delete({
      where: { id: parseInt(params.id) },
    });

    return Response.json({ message: "Data berhasil dihapus" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
