import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const pages = await prisma.page.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(pages);
  } catch (error) {
    console.error("GET /api/pages error:", error);
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const page = await prisma.page.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description ?? "",
        blocks: body.blocks ?? [],
        isPublished: body.isPublished ?? false,
      },
    });
    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    console.error("POST /api/pages error:", error);
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 });
  }
}
