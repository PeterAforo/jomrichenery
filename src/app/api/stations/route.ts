import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const stations = await prisma.station.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(stations);
  } catch (error) {
    console.error("GET /api/stations error:", error);
    return NextResponse.json({ error: "Failed to fetch stations" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (Array.isArray(body)) {
      await prisma.station.deleteMany();
      const items = [];
      for (const item of body) {
        const { id: _id, createdAt: _c, updatedAt: _u, ...data } = item;
        items.push(await prisma.station.create({ data }));
      }
      return NextResponse.json(items);
    }
    const { id, createdAt: _c, updatedAt: _u, ...data } = body;
    const station = await prisma.station.update({ where: { id }, data });
    return NextResponse.json(station);
  } catch (error) {
    console.error("PUT /api/stations error:", error);
    return NextResponse.json({ error: "Failed to update stations" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (id) {
      await prisma.station.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  } catch (error) {
    console.error("DELETE /api/stations error:", error);
    return NextResponse.json({ error: "Failed to delete station" }, { status: 500 });
  }
}
