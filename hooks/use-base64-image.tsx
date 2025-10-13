import { fetchImage } from "@/lib/apis/image";
import { useEffect, useState } from "react";

export type ImageBase64 = string | ArrayBuffer | null;

const useBase64Image = (url: string) => {
  const [image, setImage] = useState<ImageBase64>();

  useEffect(() => {
    const getAsyncImage = async () => {
      const base64Img = await fetchImage(url);
      const fileReaderInstance = new FileReader();
      fileReaderInstance.readAsDataURL(base64Img);
      fileReaderInstance.onloadend = () => {
        setImage(fileReaderInstance.result);
      }
    }
    
    setImage(undefined);
    getAsyncImage();
  }, [url]);

  return image
}

export default useBase64Image;
