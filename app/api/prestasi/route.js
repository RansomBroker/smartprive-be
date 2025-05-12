import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/app/middleware/middleware";

export async function GET(req) {
  const auth = await authMiddleware(req);

  if (!auth) {
    return Response.json({ error: "Unauthorized" }, { status: auth.status });
  }

  try {
    const prestasiData = await prisma.prestasi.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    return Response.json(prestasiData);
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

  try {
    const newPrestasi = await prisma.prestasi.create({
      data: {
        name: body.name,
        userId: body.userId,
      },
    });

    return Response.json(newPrestasi);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
