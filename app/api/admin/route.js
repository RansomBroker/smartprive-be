// app/admin/route.js
import { prisma } from "@/lib/prisma";
import { authMiddleware } from '@/app/middleware/middleware';

export async function GET() {
  const { data, error } = await supabase.from('admin').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req) {
  const body = await req.json();
  const { data, error } = await supabase.from('admin').insert([body]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
