import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'

export async function GET(){
    const image = await prisma.image.findMany()
    return NextResponse.json(image) 
}

export async function  POST(request:NextRequest){
    const body = await request.json();
    const image = await prisma.image.create({data:body})
    return NextResponse.json(image,{status:201}) 
}