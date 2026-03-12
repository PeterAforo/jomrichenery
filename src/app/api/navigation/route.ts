import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const navItems = await prisma.navItem.findMany({
      where: { parentId: null },
      include: { children: { orderBy: { order: "asc" } } },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(navItems);
  } catch (error) {
    console.error("GET /api/navigation error:", error);
    return NextResponse.json({ error: "Failed to fetch navigation" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    // Replace all nav items
    await prisma.navItem.deleteMany();
    const items = [];
    for (const item of body) {
      const parent = await prisma.navItem.create({
        data: {
          label: item.label,
          href: item.href,
          order: item.order ?? 0,
        },
      });
      if (item.children && item.children.length > 0) {
        for (const child of item.children) {
          await prisma.navItem.create({
            data: {
              label: child.label,
              href: child.href,
              order: child.order ?? 0,
              parentId: parent.id,
            },
          });
        }
      }
      const full = await prisma.navItem.findUnique({
        where: { id: parent.id },
        include: { children: { orderBy: { order: "asc" } } },
      });
      items.push(full);
    }
    return NextResponse.json(items);
  } catch (error) {
    console.error("PUT /api/navigation error:", error);
    return NextResponse.json({ error: "Failed to update navigation" }, { status: 500 });
  }
}
