import { useLecturesQuery } from "@/lib/queries/lecture-queries";
import { FlatList } from "react-native";
import ErrorMessage from "../error-fallback/error-message";
import NoLecturesFound from "../no-lectures-found";
import SuspenseLoading from "../suspense-loading";
import LectureCard from "./lecture-card";

const LecturesList = () => {
  const { data: lectures, isLoading, isError, isFetching, error } = useLecturesQuery();

  if (isLoading && !isError) {
    return <SuspenseLoading />
  }

  if (isError && !isFetching) {
    return <ErrorMessage error={error} />
  }

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
