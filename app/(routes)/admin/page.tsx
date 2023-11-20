import React from "react";
import { imageObjInterface } from "@/app/schemas";
import Image from "../../_components/images/image";
import ImageSidebar from "../../_components/imageSidebar/imageSidebar";
import prisma from "@/prisma/client";
import ManageLabels from "@/app/_components/admin/manageLabels";
import UploadImage from "@/app/_components/admin/uploadImage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Page() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.email !== "galleryace123@gmail.com") {
    return (
      <>
        <div className=" m-auto flex flex-col items-center justify-center">
          <h1 className=" text-5xl">Sign in with ADMIN account to access</h1>
          <div className=" flex flex-col align-middle mt-20">
            <h2 className=" text-3xl"> ADMIN account credentials</h2>
            <label className="mt-5 text-2xl">UserName : galleryace123@gmail.com</label>
            <label className="text-2xl">Password : gallery@123</label>
          </div>
        </div>
      </>
    );
  }
  const images = (await prisma.image.findMany()) as imageObjInterface[];
  return (
    <>
      <div className="flex">
        <div className="basis-[65%] flex-wrap flex-grow-[1] flex-shrink-[1]">
          <div>
            <UploadImage />
            <ManageLabels />
          </div>

          <div className="flex flex-wrap flex-grow-[1] flex-shrink-[1] gap-5 p-5">
            {images.map((image) => (
              <Image image={image} role="admin"></Image>
            ))}
            <div className=" w-[10rem]"></div>
            <div className=" w-[10rem]"></div>
            <div className=" w-[10rem]"></div>
          </div>
        </div>
        <ImageSidebar />
      </div>
    </>
  );
}

export default Page;
