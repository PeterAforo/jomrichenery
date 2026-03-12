import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({ where: { id: "default" } });
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: { id: "default" },
      });
    }
    return NextResponse.json(settings);
  } catch (error) {
    console.error("GET /api/settings error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const settings = await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: {
        siteName: body.siteName,
        tagline: body.tagline,
        description: body.description,
        logo: body.logo,
        favicon: body.favicon,
        email: body.email,
        phone: body.phone,
        address: body.address,
        socialLinks: body.socialLinks ?? {},
      },
      create: {
        id: "default",
        siteName: body.siteName,
        tagline: body.tagline,
        description: body.description,
        logo: body.logo,
        favicon: body.favicon,
        email: body.email,
        phone: body.phone,
        address: body.address,
        socialLinks: body.socialLinks ?? {},
      },
    });
    return NextResponse.json(settings);
  } catch (error) {
    console.error("PUT /api/settings error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
