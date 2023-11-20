import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    request: NextRequest,
    { params: { id } }: { params: { id: string } }
  ) {
    const body = await request.json();
    const image = await prisma.image.update({ where: { id: id }, data: body });
    return NextResponse.json({ image });
  }