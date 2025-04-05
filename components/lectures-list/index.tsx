import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import useScrollUpHandler from "@/hooks/use-scroll-up-handler";
import { useInfiniteLectureQueries } from "@/lib/queries/lecture-queries";
import { allowedValues } from "@/lib/schemas/lecture-search-params-schema";
import { LectureSummary } from "@/types/lecture";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useLocalSearchParams } from "expo-router";
import { ArrowUp } from "lucide-react-native";
import { useCallback, useMemo, useRef } from "react";
import { SectionList, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import ErrorMessage from "../error-fallback/error-message";
import NoLecturesFound from "../no-lectures-found";
import SuspenseLoading from "../suspense-loading";
import { Icon } from "../ui/icon";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";
import StickyHeader from "./components/sticky-header";
import LectureCard from "./lecture-card";

const colors = ["#660099", "#9900ff"] as const;

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList<LectureSummary>);

const LecturesList = () => {
  const { animatedButtonStyle, scrollHandler } = useScrollUpHandler();
  const sectionListRef = useRef<SectionList<LectureSummary>>(null);
  const stickyHeader = useMemo(() => <StickyHeader className="elevation-xl pt-4" />, []);
  const {
    q = "",
    sort = allowedValues["sort"][0],
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

  const renderCB = useCallback(_renderItem, [data]);

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
        removeClippedSubviews
        scrollEventThrottle={16}
        className="w-full mt-5"
        initialNumToRender={3}
        onEndReached={handleOnReachEnd}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        renderItem={renderCB}
        renderSectionHeader={() => stickyHeader}
        stickySectionHeadersEnabled
        ListFooterComponentStyle={{ marginBottom: 16 }}
        ListFooterComponent={() => {
          if (isLoading) return <SuspenseLoading className="pt-[4rem]" />;
          if (!isLoading && !isError && !dataArray.length) return <NoLecturesFound className="flex-grow mt-[4rem]" />;
          if (isFetchingNextPage) return <SuspenseLoading className="py-8" onLayout={() => { }} />
          if (!hasNextPage && dataArray.length && !isFetchingNextPage) {
            return <Text className="text-typography-500 text-center">Não há mais palestras a carregar...</Text>
          }
        }}
        ListHeaderComponent={
          <VStack className="justify-center items-center">
            <MaskedView maskElement={<Heading className="text-5xl bg-transparent">Lecturize it</Heading>}>
              <LinearGradient colors={colors} start={{ x: 1, y: 1 }} end={{ x: 0, y: 1 }}>
                <Heading className="text-5xl text-transparent bg-clip-text">
                  Lecturize it
                </Heading>
              </LinearGradient>
            </MaskedView>
            <Text className="text-typography-600 text-sm font-light w-full max-w-[270px] text-center mt-1">
              Simplifique suas palestras com ferramentas poderosas para gerenciar conteúdo, horários e mais.
            </Text>
            <Link href="/create-lecture" asChild>
              <Button className="w-full max-w-[150px] mt-4" action="accent">
                <ButtonText>Comece agora!</ButtonText>
              </Button>
            </Link>
          </VStack>
        }
      />

      <Animated.View style={[animatedButtonStyle, { position: "absolute", bottom: 50, right: 5 }]} className="bg-typography-0 rounded-full p-1">
        <TouchableOpacity onPress={() => sectionListRef.current?.scrollToLocation({
          sectionIndex: 0,
          itemIndex: 0,
          animated: true,
        })}>
          <Icon as={ArrowUp} className="text-accent" />
        </TouchableOpacity>
      </Animated.View>
    </>
  )
}

const _renderItem = ({ item }: { item: LectureSummary }) => <LectureCard lecture={item} />

export default LecturesList;
