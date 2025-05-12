import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/app/middleware/middleware";

export async function GET(req) {
  const auth = await authMiddleware(req);

  if (!auth) {
    return Response.json({ error: "Unauthorized" }, { status: auth.status });
  }

  try {
    const data = await prisma.absensi.findMany({
      include: { user: true },
      orderBy: { absensiDate: "desc" },
    });
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const auth = await authMiddleware(req);

  if (!auth) {
    return Response.json({ error: "Unauthorized" }, { status: auth.status });
  }

  const body = await req.json();

  if (!Array.isArray(body)) {
    return Response.json(
      { error: "Payload harus berupa array of object" },
      { status: 422 }
    );
  }

  try {
    const dataToInsert = body.map((item) => ({
      userId: item.userId,
      status: item.status,
      absensiDate: item.absensiDate ? new Date(item.absensiDate) : undefined,
    }));

    const result = await prisma.absensi.createMany({ data: dataToInsert });

    return Response.json({
      message: "Data berhasil disimpan",
      count: result.count,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
