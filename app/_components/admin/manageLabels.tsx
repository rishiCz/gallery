"use client";
import { setUpdate } from "@/app/_redux/features/activeImage/activeImageSlice";
import { RootState } from "@/app/_redux/store";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ManageLabels = () => {
  const imageReduxState = useSelector((state: RootState) => state.activeImage);
  const dispatch = useDispatch()
  const [allLabels, setAllLabels] = useState([{ label: "", id: "" }]);
  const [showLabels, setShowLabels] = useState(false);
  const [input, setInput] = useState("");
  const [updateLabel, setUpdateLabel] = useState(true)

  useEffect(() => {
    fetch("api/labels").then((body: any) =>
      body.json().then((labels: any) => {
        setAllLabels(labels);
      })
    );
    console.log("infinite")
  },[updateLabel]);

  const removelabel = (labelID: String) => {
    fetch(`api/labels/${labelID}`, {
      method: "DELETE",
    }).finally(() => {
      dispatch(setUpdate())
      setUpdateLabel(prev=>!prev)
    });
  };

  const addLabel = () => {
    setInput("")
    const data = { label: input };
    const jsonData = JSON.stringify(data);
    fetch("api/labels", { method: "POST", body: jsonData }).finally(() => {
      dispatch(setUpdate())
      setUpdateLabel(prev=>!prev)
    });
  };
  
  return (
    <>
      <button
        className={`btn btn-outline ${
          showLabels ? "btn-error" : "btn-accent"
        } text-lg`}
        onClick={() => {
          setShowLabels((prev) => !prev);
        }}
      >
        {showLabels ? "CLOSE X" : "Manage labels"}
      </button>
      {showLabels && (
        <div className="bg-gray-900 m-5 p-5 rounded-lg">
          <div className="flex mb-3">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-accent w-full max-w-xs"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
              }}
            />
            <button className="btn btn-success mx-5" onClick={addLabel}>
              Add label
            </button>
          </div>
          <label className="">Click on labels to delete</label> 
          <div className="flex gap-5 flex-wrap mt-3">
            {allLabels.map((labelObj,index) => (
              < Fragment key = {index}>
                <button
                  className={`btn btn-outline btn-error text-lg`}
                  onClick={() => {
                    removelabel(labelObj.id);
                  }}
                >
                  {labelObj.label}
                </button>
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ManageLabels;
