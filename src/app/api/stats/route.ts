import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const stats = await prisma.stat.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(stats);
  } catch (error) {
    console.error("GET /api/stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (Array.isArray(body)) {
      await prisma.stat.deleteMany();
      const items = [];
      for (const item of body) {
        const { id: _id, createdAt: _c, updatedAt: _u, ...data } = item;
        items.push(await prisma.stat.create({ data }));
      }
      return NextResponse.json(items);
    }
    const { id, createdAt: _c, updatedAt: _u, ...data } = body;
    const stat = await prisma.stat.update({ where: { id }, data });
    return NextResponse.json(stat);
  } catch (error) {
    console.error("PUT /api/stats error:", error);
    return NextResponse.json({ error: "Failed to update stats" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (id) {
      await prisma.stat.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  } catch (error) {
    console.error("DELETE /api/stats error:", error);
    return NextResponse.json({ error: "Failed to delete stat" }, { status: 500 });
  }
}
