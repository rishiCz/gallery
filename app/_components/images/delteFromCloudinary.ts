import crypto from "crypto";

const generateSHA1 =(data: any) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
}

const generateSignature = (publicId: string, apiSecret: string) => {
	const timestamp = new Date().getTime();
	return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};
export const handleDeleteImage = (publicId:string) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const timestamp = new Date().getTime();
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const signature = generateSHA1(generateSignature(publicId, apiSecret!));
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;
  
    const body = {
      public_id: publicId,
      signature: signature,
      api_key: apiKey,
      timestamp: timestamp,
    }
    const jsonBody = JSON.stringify(body)
    try {
      fetch(url,{
        method:"POST",
        body:jsonBody
      } );
  
    } catch (error) {
      console.error(error);
    }
  };