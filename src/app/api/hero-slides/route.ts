import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(slides);
  } catch (error) {
    console.error("GET /api/hero-slides error:", error);
    return NextResponse.json({ error: "Failed to fetch hero slides" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slide = await prisma.heroSlide.create({ data: body });
    return NextResponse.json(slide, { status: 201 });
  } catch (error) {
    console.error("POST /api/hero-slides error:", error);
    return NextResponse.json({ error: "Failed to create hero slide" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (Array.isArray(body)) {
      await prisma.heroSlide.deleteMany();
      const slides = [];
      for (const item of body) {
        const { id: _id, createdAt: _c, updatedAt: _u, ...data } = item;
        slides.push(await prisma.heroSlide.create({ data }));
      }
      return NextResponse.json(slides);
    }
    const { id, createdAt: _c, updatedAt: _u, ...data } = body;
    const slide = await prisma.heroSlide.update({ where: { id }, data });
    return NextResponse.json(slide);
  } catch (error) {
    console.error("PUT /api/hero-slides error:", error);
    return NextResponse.json({ error: "Failed to update hero slides" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (id) {
      await prisma.heroSlide.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  } catch (error) {
    console.error("DELETE /api/hero-slides error:", error);
    return NextResponse.json({ error: "Failed to delete hero slide" }, { status: 500 });
  }
}
