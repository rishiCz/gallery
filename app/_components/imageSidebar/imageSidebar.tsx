"use client";

import { RootState } from "@/app/_redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setIsOpen } from "@/app/_redux/features/activeImage/activeImageSlice";
import Labels from "./labels";
import AddLabel from "./addLabel";
import { useEffect, useState } from "react";

function ImageSidebar() {
  const imageReduxState = useSelector((state: RootState) => state.activeImage);
  const [isOpen, setIsSideOpen] = useState(imageReduxState.isSidebarOpen);
  const dispatch = useDispatch();
  const [imageObj, setImageObj] = useState({
    imageLink: "",
    label: [""],
    id: "",
    cid: "",
  });
  useEffect(() => {
    setIsSideOpen(imageReduxState.isSidebarOpen);
  }, [imageReduxState.isSidebarOpen]);

  useEffect(() => {
    console.log("ran")
    fetch(`api/images/${imageReduxState.imageID}`).then((result) => {
      result.json().then((body) => {
        if(body.image)
        setImageObj(body.image);
      });
    });
  }, [imageReduxState.imageID,imageReduxState.isActive]);
  
  const closeSidebar = () => {
    dispatch(setIsOpen(false));
  };
  const sideBarStyle = {
    flexBasis: `${isOpen ? 35 : 0}%`,
  };
  return (
    <div style={sideBarStyle}>
      <div
        style={{ display: `${isOpen ? "unset" : "none"}` }}
        className={` fixed right-0 bg-gray-700 rounded-md  w-[35%] h-full `}
      >
        <button className="btn btn-circle  btn-xs m-2" onClick={closeSidebar}>
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
        <div className=" bg-black">
          <img
            className=" w-full max-h-96 object-contain m-auto"
            src={imageObj.imageLink}
          ></img>
        </div>
        <div className="m-4">
          <h4>Tags</h4>
          <Labels image={imageObj} />
          <AddLabel imageObj={imageObj} />
        </div>
      </div>
    </div>
  );
}

export default ImageSidebar;
