import prisma from "@/prisma/client";

export const delteImage = async(id:string)=>{
    return await prisma.image.delete({ where: { id: id } });
}