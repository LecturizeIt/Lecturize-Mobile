import { useLectureDetailQuery } from "@/lib/queries/lecture-queries";
import { ScrollView } from "react-native";
import LectureForm from "../lecture-form";

const UpdateLecture = ({ id, scrollViewRef }: { id: string, scrollViewRef: React.RefObject<ScrollView> }) => {
  const { data: lecture, isLoading } = useLectureDetailQuery(id);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <LectureForm scrollViewRef={scrollViewRef} update={lecture}  />
    </>
  )
}

export default UpdateLecture;
