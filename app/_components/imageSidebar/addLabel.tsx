"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { imageObjInterface } from "@/app/schemas";
import { useDispatch, useSelector } from "react-redux";
import { setUpdate } from "@/app/_redux/features/activeImage/activeImageSlice";
import { RootState } from "@/app/_redux/store";

const AddLabel = ({ imageObj }: { imageObj: imageObjInterface }) => {
  const imageReduxState = useSelector((state: RootState) => state.activeImage);
  const dispatch = useDispatch()
  const router = useRouter();
  const [allLabels, setAllLabels] = useState([{ label: "", id: "" }]);
  useEffect(() => {
    fetch("api/labels")
      .then((body: any) =>
        body.json().then((labels: any) => {
          setAllLabels(labels);
        })
      )
      .finally(() => {
        router.refresh();
      });
  }, [imageReduxState.isActive]);
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
      dispatch(setUpdate())
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
          {allLabels.map((labelObj) => (
            <button
              className="btn btn-outline"
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
