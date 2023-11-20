import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'

export async function GET(request:NextRequest){
    const labels = await prisma.labels.findMany()
    return NextResponse.json(labels) 
}

export async function  POST(request:NextRequest){
    const body = await request.json();
    const labels = await prisma.labels.create({data:body})
    return NextResponse.json(labels,{status:201}) 
}