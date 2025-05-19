import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret_key";

export async function POST(req) {
  const { username, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return Response.json({ error: "User tidak ditemukan" }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return Response.json({ error: "Password salah" }, { status: 401 });
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      level: user.level,
      nohp: user.nohp,
      alamat: user.alamat,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  return Response.json(
    {
      token: token,
      user: {
        id: user.id,
        username: user.username,
        level: user.level,
        nohp: user.nohp,
        alamat: user.alamat,
      },
    },
    { status: 200 }
  );
}
