import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(partners);
  } catch (error) {
    console.error("GET /api/partners error:", error);
    return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (Array.isArray(body)) {
      await prisma.partner.deleteMany();
      const items = [];
      for (const item of body) {
        const { id: _id, createdAt: _c, updatedAt: _u, ...data } = item;
        items.push(await prisma.partner.create({ data }));
      }
      return NextResponse.json(items);
    }
    const { id, createdAt: _c, updatedAt: _u, ...data } = body;
    const partner = await prisma.partner.update({ where: { id }, data });
    return NextResponse.json(partner);
  } catch (error) {
    console.error("PUT /api/partners error:", error);
    return NextResponse.json({ error: "Failed to update partners" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (id) {
      await prisma.partner.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  } catch (error) {
    console.error("DELETE /api/partners error:", error);
    return NextResponse.json({ error: "Failed to delete partner" }, { status: 500 });
  }
}
