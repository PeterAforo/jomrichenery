import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(services);
  } catch (error) {
    console.error("GET /api/services error:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const service = await prisma.service.create({ data: body });
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("POST /api/services error:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (Array.isArray(body)) {
      await prisma.service.deleteMany();
      const items = [];
      for (const item of body) {
        const { id: _id, createdAt: _c, updatedAt: _u, ...data } = item;
        items.push(await prisma.service.create({ data }));
      }
      return NextResponse.json(items);
    }
    const { id, createdAt: _c, updatedAt: _u, ...data } = body;
    const service = await prisma.service.update({ where: { id }, data });
    return NextResponse.json(service);
  } catch (error) {
    console.error("PUT /api/services error:", error);
    return NextResponse.json({ error: "Failed to update services" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (id) {
      await prisma.service.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  } catch (error) {
    console.error("DELETE /api/services error:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
