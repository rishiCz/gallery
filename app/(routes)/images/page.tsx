import React, { Suspense } from "react";
import Image from "../../_components/images/image";
import ImageSidebar from "../../_components/imageSidebar/imageSidebar";
import prisma from "@/prisma/client";
import { imageObjInterface } from "@/app/schemas";

export type Labels =
  { id: string, label: string }[]

async function Page({ searchParams }: any) {
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
    <div className="flex">
      <div className="flex basis-[65%] flex-wrap flex-grow-[1] flex-shrink-[1] gap-5 p-5">
        {filteredImages.map((image, index) => (
          <Image isLast={index == filteredImages.length-1} image={image} labels={labels} role="user" key={index}></Image>
        ))}

      </div>
      <ImageSidebar />
    </div>
  );
}

export default Page;

