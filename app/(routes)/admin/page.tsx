import React from "react";
import { imageObjInterface } from "@/app/schemas";
import Image from "../../_components/images/image";
import ImageSidebar from "../../_components/imageSidebar/imageSidebar";
import prisma from "@/prisma/client";
import ManageLabels from "@/app/_components/admin/manageLabels";
import UploadImage from "@/app/_components/admin/uploadImage";
import { Labels } from "../images/page";

async function Page({searchParams}:any) {
  const search = searchParams.search?.toLowerCase() || '';

  const images = await prisma.image.findMany() as imageObjInterface[];
  const labels = await prisma.labels.findMany() as Labels;

  const filteredLabels = labels.filter(({ label }) =>
    label.toLowerCase().includes(search)
  );

  const filteredLabelIds = new Set(filteredLabels.map(l => l.id));

  const filteredImages = images.filter(image =>
    image.label.some(labelId => filteredLabelIds.has(labelId) )|| search == ""
  );
  return (
    <>
      <div className="flex">
        <div className="basis-[65%] flex-wrap flex-grow-[1] flex-shrink-[1]">
          <div>
            <UploadImage />
            <ManageLabels />
          </div>

          <div className="flex flex-wrap flex-grow-[1] flex-shrink-[1] gap-5 p-5">
            {filteredImages.map((image,index) => (
              <Image isLast={index == filteredImages.length-1} image={image} labels={labels} role="admin" key={index}></Image>
            ))}

          </div>
        </div>
        <ImageSidebar searchParams={searchParams} images={images} labels={labels} />
      </div>
    </>
  );
}

export default Page;

