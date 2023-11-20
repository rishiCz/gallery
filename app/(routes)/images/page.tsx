import React, { useEffect } from "react";
import Image from "../../_components/images/image";
import ImageSidebar from "../../_components/imageSidebar/imageSidebar";
import prisma from "@/prisma/client";
import { imageObjInterface } from "@/app/schemas";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function  Page() {
  const session = await getServerSession(authOptions)
  if (!session)
  return (<>
  <h1 className="text-5xl m-40">Login to continue -----------------------{':)'}</h1>
  </>)
  return (
    <div className="flex">
      <div className="flex basis-[65%] flex-wrap flex-grow-[1] flex-shrink-[1] gap-5 p-5">
        {(await prisma.image.findMany() as imageObjInterface[]).map((image) => (
          <Image image={image} role="user"></Image>
        ))}
        <div className="h-full w-[10rem]"></div>
        <div className="h-full w-[10rem]"></div>
        <div className="h-full w-[10rem]"></div>
      </div>
      <ImageSidebar/>
    </div>
  );
}

export default Page;
