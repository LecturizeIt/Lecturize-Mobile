import { useInfiniteLectureQueries } from "@/lib/queries/lecture-queries";
import { useLocalSearchParams } from "expo-router";
import { FlatList } from "react-native";
import ErrorMessage from "../error-fallback/error-message";
import NoLecturesFound from "../no-lectures-found";
import SuspenseLoading from "../suspense-loading";
import LectureCard from "./lecture-card";
import LecturesSearchBar from "./lectures-searchbar";
import { Text } from "../ui/text";

const LecturesList = () => {
  const { query } = useLocalSearchParams<{ query?: string }>();
  const q = query ?? "";
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isError,
    isLoading
  } = useInfiniteLectureQueries({ q, });

  if (isError) {
    return <ErrorMessage error={error} />
  }

  const handleOnReachEnd = () => {
    if (hasNextPage && !isLoading) fetchNextPage();
  }

  const dataArray = data?.pages.flatMap(page => page.results) ?? [];

  return (
    <>
      <LecturesSearchBar />
      {isLoading ? <SuspenseLoading /> : (
        <FlatList
          data={dataArray}
          keyExtractor={(lecture, index) => lecture.id}
          numColumns={1}
          className="mt-5 w-full"
          renderItem={({ item: lecture }) => (
            <LectureCard lecture={lecture} />
          )}
          onEndReached={handleOnReachEnd}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={!isLoading && !isError ? <NoLecturesFound className="flex-grow border border-accent" /> : null}
          ListFooterComponent={() => {
            if (isFetchingNextPage) return <SuspenseLoading className="py-8" />
            if (!hasNextPage && dataArray.length && !isFetchingNextPage) return <Text className="text-typography-500 text-center">Não há mais palestras a carregar...</Text>
          }}
        />
      )}
    </>
  )
}

export default LecturesList;
