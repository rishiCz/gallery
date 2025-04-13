"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { imageObjInterface } from "@/app/schemas";
import { Labels } from "@prisma/client";

const AddLabel = ({ imageObj, labels }: { imageObj: imageObjInterface, labels:Labels[] }) => {
  const router = useRouter();

  const [isInputOpen, setInputOpen] = useState(false);
  const addlabel = (labelId: string) => {
    const { id, label, ...restImage } = imageObj;
    const body = {
      label: [labelId, ...label],
      ...restImage
    };
    fetch(`api/images/${imageObj.id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }).finally(() => {
      router.refresh()
    });
  };

  return (
    <div className="mt-3">
      <button
        className="btn btn-active btn-neutral btn-wide"
        onClick={() => {
          setInputOpen((prev) => !prev);
        }}
      >
        {!isInputOpen ? "Add Label" : "Close"}
      </button>
      {isInputOpen && (
        <div className="h-fit w-fit flex flex-wrap mt-3 gap-3">
          {labels.filter(label=> !imageObj.label.includes(label.id)).map((labelObj,index) => (
            <button
              className="btn btn-outline"
              key={index}
              onClick={() => {
                addlabel(labelObj.id);
              }}
            >
              {labelObj.label} +{" "}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddLabel;
