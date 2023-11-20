"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { setActiveId,setIsOpen } from "@/app/_redux/features/activeImage/activeImageSlice";
import { useRouter } from "next/navigation";
import { handleDeleteImage } from "./delteFromCloudinary";
import { imageObjInterface } from "@/app/schemas";

function Image({ image, role }: { image: imageObjInterface; role: String }) {
  const dispatch = useDispatch();
  const router = useRouter()
  const imageClick = (image: imageObjInterface) => {
    dispatch(setActiveId(image.id));
    dispatch(setIsOpen(true));
  };

  const deleteImage = (event:any)=>{
    event.stopPropagation()
    fetch(`api/images/${image.id}`,{
      method:"DELETE"
    }).finally(()=>{
      router.refresh()
    })
    handleDeleteImage(image.cid)
  }

  return (
    <div
      className=" h-64 flex-[auto] shrink-[1] grow--[1] rounded-md relative duration-200 ease-in-out transition-all bg-gray-800 hover:cursor-pointer hover:scale-[1.01]"
      onClick={() => {
        imageClick(image);
      }}
    >
      {role === "admin" && (
        <button className="btn btn-square btn-sm btn-error absolute right-2 top-2" onClick={deleteImage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      <img
        className="h-full w-full rounded-md object-cover"
        src={image.imageLink}
      />
    </div>
  );
}

export default Image;
