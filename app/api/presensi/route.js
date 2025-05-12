import { prisma } from "@/lib/prisma";

export async function GET() {
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
