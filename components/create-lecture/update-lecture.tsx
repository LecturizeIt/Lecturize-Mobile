import { useLectureDetailQuery } from "@/lib/queries/lecture-queries";
import { ScrollView } from "react-native";
import LectureForm from "../lecture-form";
import SuspenseLoading from "../suspense-loading";

const UpdateLecture = ({ id, scrollViewRef }: { id: string, scrollViewRef: React.RefObject<ScrollView> }) => {
  const { data: lecture, isLoading } = useLectureDetailQuery(id);

  if (isLoading) {
    return <SuspenseLoading />;
  }

  return (
    <>
      <LectureForm scrollViewRef={scrollViewRef} update={lecture} />
    </>
  )
}

export default UpdateLecture;
