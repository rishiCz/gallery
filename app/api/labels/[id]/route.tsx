import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const label = await prisma.labels.delete({where:{id:id}})
  return NextResponse.json({label})
}
