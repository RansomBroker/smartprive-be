import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
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
