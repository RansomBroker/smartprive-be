import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/app/middleware/middleware";

export async function GET(req) {
  const auth = await authMiddleware(req);
  if (!auth) {
    return Response.json({ error: "Unauthorized" }, { status: auth.status });
  }

  try {
    // Get URL search params
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const semester = searchParams.get("semester");

    // Build where clause based on query params
    const where = {};
    if (userId) {
      where.userId = parseInt(userId);
    }
    if (semester) {
      where.semester = semester;
    }

    const rapotData = await prisma.rapot.findMany({
      where,
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    return Response.json(rapotData);
  } catch (error) {
    console.error("Error fetching rapot:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const auth = await authMiddleware(req);
  if (!auth) {
    return Response.json({ error: "Unauthorized" }, { status: auth.status });
  }

  const body = await req.json();

  // Validate required fields
  if (!body.mapel || !body.bab || !body.nilai || !body.userId) {
    return Response.json(
      {
        error: "mapel, bab, nilai, dan userId harus diisi",
      },
      { status: 400 }
    );
  }

  try {
    const newRapot = await prisma.rapot.create({
      data: {
        mapel: body.mapel,
        bab: body.bab,
        nilai: body.nilai,
        semester: body.semester || null,
        catatan: body.catatan || null,
        userId: parseInt(body.userId), // Ensure userId is a number
      },
      include: {
        user: true, // Include user data in response
      },
    });

    return Response.json(newRapot);
  } catch (error) {
    console.error("Error creating rapot:", error);
    return Response.json({ error: error.message }, { status: 400 });
  }
}
