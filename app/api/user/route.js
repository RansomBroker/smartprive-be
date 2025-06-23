import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/app/middleware/middleware";
import bcrypt from "bcryptjs";

export async function GET(req) {
  const auth = await authMiddleware(req);

  if (!auth) {
    return Response.json({ error: "Unauthorized" }, { status: auth.status });
  }

  const users = await prisma.user.findMany({
    include: {
      rapots: true,
      absensis: true,
      prestasis: true,
    },
  });
  return Response.json(users);
}

export async function POST(req) {
  const auth = await authMiddleware(req);

  if (!auth) {
    return Response.json({ error: "Unauthorized" }, { status: auth.status });
  }

  const body = await req.json();
  const hashedPassword = await bcrypt.hash(body.password, 10);
  body.password = hashedPassword;
  const { username, name, password, level, nohp, alamat, kelas = "" } = body;

  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        name,
        password,
        level,
        nohp,
        alamat,
        kelas,
      },
    });
    return Response.json(newUser, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
