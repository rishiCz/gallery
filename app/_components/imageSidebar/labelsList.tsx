"use client"
import { useRouter } from "next/navigation";
import { imageObjInterface, labelObjInterface } from "@/app/schemas";
import { Labels } from "@prisma/client";

function LabelsList({ image, labels }: { image: imageObjInterface, labels:Labels[] }) {
  const labelIDs = image.label
  
  const router = useRouter();
  const filteredLabels = labels.filter(lab => image.label.includes(lab.id))
 
  const removelabel = (plabel: string) => {
    const newLabels = labelIDs.filter((item) => item !== plabel);
    const { id, label, ...restImageData } = image;
    fetch(`api/images/${image.id}`, {
      method: "PATCH",
      body: JSON.stringify({ label: newLabels, ...restImageData }),
    }).finally(() => {
        router.refresh();
      });
  };
  return (
    <div className="flex flex-wrap mt-1 gap-3">
      {filteredLabels.map((labelObj,index) => {
        return (
          labelObj && (
            <div className="badge  gap-2 p-4" key={index}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block -ms-2 w-4 h-4 stroke-current hover:cursor-pointer"
                onClick={() => {
                  removelabel(labelObj.id);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              {labelObj.label}
            </div>
          )
        );
      })}
    </div>
  );
}

export default LabelsList;
