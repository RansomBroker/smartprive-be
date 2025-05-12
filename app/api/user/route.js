import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      prestasis: true,
      absesnsis: true,
    },
  });
  return Response.json(users);
}

export async function POST(req) {
  const body = await req.json();
  const { username, name, password, level, nohp, alamat } = body;

  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        name,
        password,
        level,
        nohp,
        alamat,
      },
    });
    return Response.json(newUser, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
