"use client";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";

const UploadImage = () => {
  const router = useRouter();
  const upload = (result: any, widget: any) => {
    const body = {
      imageLink: result.info.url,
      label: [],
      cid: result.info.public_id
    };
    const jsonBody = JSON.stringify(body);
    fetch("api/images", { method: "POST", body: jsonBody }).finally(() => {
      router.refresh();
    });
  };
  return (
    <>
      <CldUploadButton
        onUpload={upload}
        uploadPreset="yynmtdjr"
        options={{
          sources: ["local", "url"],
          multiple:false,
            
          styles: {
            palette: {
              window: "#1E1E1E",
              sourceBg: "#1E1E1E",
              windowBorder: "#686868",
              tabIcon: "#FFFFFF",
              inactiveTabIcon: "#8E9FBF",
              menuIcons: "#5B5B5B",
              link: "#08FFD5",
              action: "#336BFF",
              inProgress: "#00BFFF",
              complete: "#33ff00",
              error: "#EA2727",
              textDark: "#000000",
              textLight: "#E5E5E5",
            },
            frame: {
                background: "#1f252e"
              }
          },
        }}
        className="btn btn-success mx-5"
      >
        ADD IMAGES
      </CldUploadButton>
    </>
  );
};

export default UploadImage;
