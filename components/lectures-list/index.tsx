import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import useScrollUpHandler from "@/hooks/use-scroll-up-handler";
import { useInfiniteLectureQueries } from "@/lib/queries/lecture-queries";
import { Lecture } from "@/types/lecture";
import { Link, useLocalSearchParams } from "expo-router";
import { ArrowUp } from "lucide-react-native";
import { useMemo, useRef } from "react";
import { SectionList, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import ErrorMessage from "../error-fallback/error-message";
import NoLecturesFound from "../no-lectures-found";
import SuspenseLoading from "../suspense-loading";
import { Icon } from "../ui/icon";
import { Text } from "../ui/text";
import StickyHeader from "./components/sticky-header";
import LectureCard from "./lecture-card";

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList<Lecture>);

const LecturesList = () => {
  const { animatedButtonStyle, scrollHandler } = useScrollUpHandler();
  const sectionListRef = useRef<SectionList<Lecture>>(null);
  const stickyHeader = useMemo(() => <StickyHeader className="elevation-xl pt-4" />, []);
  const {
    q = "",
    sort,
    tags = "",
    lecturer = "",
  } = useLocalSearchParams<{ q?: string, sort?: string, tags?: string, lecturer?: string }>();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isError,
    isLoading
  } = useInfiniteLectureQueries({ q, sort, tags, lecturer });



  if (isError) {
    return <ErrorMessage error={error} />
  }


  const handleOnReachEnd = () => {
    if (hasNextPage && !isLoading) fetchNextPage();
  }

  const dataArray = data?.pages.flatMap(page => page.results) ?? [];


  return (
    <>
      <AnimatedSectionList
        sections={[{ data: dataArray }]}
        keyExtractor={lecture => lecture.id}
        onScroll={scrollHandler}
        ref={sectionListRef}
        scrollEventThrottle={16}
        className="w-full mt-5"
        onEndReached={handleOnReachEnd}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: lecture }) => <LectureCard lecture={lecture} />}
        renderSectionHeader={() => stickyHeader}
        stickySectionHeadersEnabled
        ListFooterComponentStyle={{ marginBottom: 16 }}
        ListFooterComponent={() => {
          if (isLoading) return <SuspenseLoading className="pt-[4rem]" />;
          if (!isLoading && !isError && !dataArray.length) return <NoLecturesFound className="flex-grow" />;
          if (isFetchingNextPage) return <SuspenseLoading className="py-8" />
          if (!hasNextPage && dataArray.length && !isFetchingNextPage) {
            return <Text className="text-typography-500 text-center">Não há mais palestras a carregar...</Text>
          }
        }}
        ListHeaderComponent={
          <>
            <Heading className="text-typography-950 text-lg text-center">
              Organize Suas Palestras de Forma Inteligente
            </Heading>
            <Text className="text-typography-600 text-sm font-light w-full max-w-[270px] text-center mt-2 mx-auto">
              Simplifique suas palestras com ferramentas poderosas para gerenciar conteúdo, horários e mais.
            </Text>
            <Link href="/create-lecture" asChild>
              <Button className="w-full max-w-[150px] mt-[1.5rem] mx-auto" action="accent">
                <ButtonText>Comece agora!</ButtonText>
              </Button>
            </Link>
          </>
        }
      />

      <Animated.View style={[animatedButtonStyle, { position: "absolute", bottom: 50, right: 15 }]}>
        <TouchableOpacity onPress={() => sectionListRef.current?.scrollToLocation({
          sectionIndex: 0,
          itemIndex: 0,
          animated: true,
        })}>
          <Icon as={ArrowUp} className="text-typography-600" />
        </TouchableOpacity>
      </Animated.View>
    </>
  )
}

export default LecturesList;