import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/app/middleware/middleware";

export async function GET(_, { params }) {
  const auth = await authMiddleware(_);

  if (!auth) {
    return Response.json({ error: "Unauthorized" }, { status: auth.status });
  }

  const id = parseInt(params.id);

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      prestasis: true,
      absesnsis: true,
    },
  });

  if (!user) return Response.json({ error: "User not found" }, { status: 404 });
  return Response.json(user);
}

export async function PUT(req, { params }) {
  const auth = await authMiddleware(req);

  if (!auth) {
    return Response.json({ error: "Unauthorized" }, { status: auth.status });
  }

  const id = parseInt(params.id);
  const body = await req.json();
  const { username, name, password, level, nohp, alamat } = body;

  try {
    const updated = await prisma.user.update({
      where: { id },
      data: {
        username,
        name,
        password,
        level,
        nohp,
        alamat,
      },
    });
    return Response.json(updated);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(_, { params }) {
  const id = parseInt(params.id);

  try {
    await prisma.user.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
