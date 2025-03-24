import { useLecturesQuery } from "@/lib/queries/lecture-queries";
import { FlatList } from "react-native";
import NoLecturesFound from "../no-lectures-found";
import LectureCard from "./lecture-card";

const LecturesList = () => {
  const { data: lectures, isLoading, isError } = useLecturesQuery();
  return (
    <>
      <FlatList
        data={lectures}
        keyExtractor={(lecture) => lecture.id}
        numColumns={1}
        scrollEnabled={false}
        className="mt-5 w-full"
        contentContainerStyle={{ flex: 1, display: "flex" }}
        renderItem={({ item: lecture }) => (
          <LectureCard lecture={lecture} />
        )}
        ListEmptyComponent={!isLoading && !isError ? <NoLecturesFound /> : null}
      />
    </>
  )
}

export default LecturesList;
