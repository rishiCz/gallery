import LabelsList from "./labelsList";
import AddLabel from "./addLabel";
import Image from "next/image";
import MergeQueryLink from "../mergeQuery";

function ImageSidebar({searchParams,images,labels}:any) {  
  const img = searchParams.img?.toLowerCase() || '';
  const imageObj = images.find((image:any)=> image.id == img)
  const sideBarStyle = {
    flexBasis: `${imageObj ? 35 : 0}%`,
  };
  return (
    <div style={sideBarStyle} className="transition-all duration-300 ease-in-out">
      {<div
        style={{ width: `${imageObj ? "35%" : "0px"}` }}
        className={` fixed transition-all ease-in-out duration-300  right-0 bg-gray-700 rounded-md  w-[35%] h-full `}
      >
        <MergeQueryLink newParams={{img:""}} className="btn btn-circle  btn-xs m-2">
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
        </MergeQueryLink>
        <div className=" bg-black relative w-full h-72">
         { imageObj &&<Image
            className=" w-full max-h-96 object-contain m-auto"
            alt="loading..."
            fill
            src={imageObj.imageLink}
          />}
        </div>
        {imageObj && <div className="m-4">
          <h4>Tags</h4>
          <LabelsList image={imageObj} labels={labels} />
          <AddLabel imageObj={imageObj} labels={labels} />
        </div>}
      </div>}
    </div>
  );
}

export default ImageSidebar;
