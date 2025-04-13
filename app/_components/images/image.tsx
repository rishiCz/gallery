import Images from 'next/image';
import React from "react";
import { imageObjInterface } from "@/app/schemas";
import { Labels } from '@prisma/client';
import MergeQueryLink from '../mergeQuery';
import { deleteImageAction } from '@/app/actions/imageActions';

async function Image({ image, labels, role, isLast }: { image: imageObjInterface; role: String, labels?: Labels[], isLast?: boolean }) {

  return (
    
      <div
        className={`group h-64 ${isLast ? 'max-w-fit' : 'max-w-[600px]'} overflow-hidden flex-[auto] shrink-[1] grow--[1] rounded-md relative duration-200 ease-in-out transition-all bg-gray-800 hover:cursor-pointer hover:scale-[1.01]`}

      >
        {role === "admin" && (
          <form action={deleteImageAction}>
            <input name="id" defaultValue={image.id} hidden/>
            <button type='submit' className="btn btn-square btn-sm btn-error absolute right-2 top-2" >
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
          </form>
        )}
        <MergeQueryLink newParams={{ img:image.id }}>
        
        <div className="group-hover:h-[30%] max-w-full opacity-0 group-hover:opacity-100 pt-8 text-white gap-2 p-2 group-ho h-0 rounded-md flex bg-gradient-to-t transition-all from-black to-transparent w-full absolute bottom-0">
          {labels && labels.
            filter(lab => image.label.includes(lab.id)).
            map((lab) => <div key={lab.id}>{lab.label}</div>)}
        </div>
        <Images
          className={`h-full ${isLast ? 'w-fit' : 'w-full'} rounded-md object-cover`}
          alt={"Loading"}
          src={image.imageLink}
          width={500}
          height={500}
        />
        </MergeQueryLink>
      </div>
    
  );
}

export default Image;
