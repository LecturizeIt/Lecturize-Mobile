import { useLecturesQuery } from "@/lib/queries/lecture-queries";
import { FlatList } from "react-native";
import Lecture from "./lecture";

const LecturesList = () => {
  const { data: lectures } = useLecturesQuery();
  return (
    <>
      <FlatList
        data={lectures}
        keyExtractor={(lecture) => lecture.id}
        numColumns={1}
        scrollEnabled={false}
        className="mt-5"
        renderItem={({ item: lecture }) => (
          <Lecture lecture={lecture} />
        )}
      />
    </>
  )
}

export default LecturesList;
