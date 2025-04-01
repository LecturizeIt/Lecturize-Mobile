import { useLectureDetailQuery, useLectureImage } from "@/lib/queries/lecture-queries";
import { ScrollView } from "react-native";
import LectureForm from "../lecture-form";
import { LectureWithImage } from "@/types/lecture";
import SuspenseLoading from "../suspense-loading";

const UpdateLecture = ({ id, scrollViewRef }: { id: string, scrollViewRef: React.RefObject<ScrollView> }) => {
  const { data: lecture, isLoading } = useLectureDetailQuery(id);
  const { data: image, isLoading: isImageLoading } = useLectureImage(id);

  if (isLoading || isImageLoading) {
    return <SuspenseLoading />;
  }

  const lectureWithImage: LectureWithImage = {
    ...lecture!,
    image
  }

  return (
    <>
      <LectureForm scrollViewRef={scrollViewRef} update={lectureWithImage} />
    </>
  )
}

export default UpdateLecture;
