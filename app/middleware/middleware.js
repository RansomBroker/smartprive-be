import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret_key";

export function authMiddleware(req) {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return new Response("Invalid token", { status: 401 });
  }

  return req;
}
