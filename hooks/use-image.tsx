import { useEffect, useState } from "react";

const useImage = (url: string) => {
  const [image, setImage] = useState<any>();

  useEffect(() => {
    const loadImage = async () => {
      try {
        const options = { headers: { accept: "image/*" }, body: null, }
        const res = await fetch(url, options);
        const blob = await res.blob();
        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(blob);
        fileReaderInstance.onload = () => {
          setImage(fileReaderInstance.result);
        }
      } catch (error) {
        console.log(error);
      }
    }

    loadImage();
  }, [])

  return { image }
}

export default useImage;
