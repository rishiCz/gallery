import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { delteImage } from "./label/controller";

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }) {
  const image = await delteImage(id)
  return NextResponse.json({ image });
}

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }) {
  const image = await prisma.image.findFirst({ where: { id: id } });
  return NextResponse.json({ image });
}

export async function PATCH(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body = await request.json();
  const image = await prisma.image.update({ where: { id: id }, data: body });
  return NextResponse.json({ image });
}
