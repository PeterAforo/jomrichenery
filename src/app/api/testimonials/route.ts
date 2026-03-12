import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("GET /api/testimonials error:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (Array.isArray(body)) {
      await prisma.testimonial.deleteMany();
      const items = [];
      for (const item of body) {
        const { id: _id, createdAt: _c, updatedAt: _u, ...data } = item;
        items.push(await prisma.testimonial.create({ data }));
      }
      return NextResponse.json(items);
    }
    const { id, createdAt: _c, updatedAt: _u, ...data } = body;
    const testimonial = await prisma.testimonial.update({ where: { id }, data });
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("PUT /api/testimonials error:", error);
    return NextResponse.json({ error: "Failed to update testimonials" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (id) {
      await prisma.testimonial.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  } catch (error) {
    console.error("DELETE /api/testimonials error:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
