import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const page = await prisma.page.findUnique({ where: { id } });
    if (!page) return NextResponse.json({ error: "Page not found" }, { status: 404 });
    return NextResponse.json(page);
  } catch (error) {
    console.error("GET /api/pages/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch page" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const page = await prisma.page.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        blocks: body.blocks,
        isPublished: body.isPublished,
      },
    });
    return NextResponse.json(page);
  } catch (error) {
    console.error("PUT /api/pages/[id] error:", error);
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.page.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/pages/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete page" }, { status: 500 });
  }
}
