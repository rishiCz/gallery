import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const user = await prisma.user.findFirst({where:{email:id}})
  return NextResponse.json({user})
}
