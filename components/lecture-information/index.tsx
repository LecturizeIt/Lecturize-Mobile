import { useLectureDetailQuery } from "@/lib/queries/lecture-queries";
import { formatDate } from "@/utilities/utils";
import { PropsWithChildren } from "react";
import ErrorFallback from "../error-fallback";
import SuspenseLoading from "../suspense-loading";
import { Card } from "../ui/card";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";
import LectureTags from "./components/lecture-tags";
import Lecturer from "./components/lecturer";
import TimeInfo from "./components/time-info";
import TypeInfo from "./components/type-info";
import { Icon } from "../ui/icon";
import { Eye } from "lucide-react-native";
import { Box } from "../ui/box";


const LectureInformation = ({ id }: { id: string }) => {
  const { data: lecture, isLoading, isError, isFetching, error } = useLectureDetailQuery(id);

  if (isLoading) {
    return (
      <Layout>
        <SuspenseLoading />
      </Layout>
    )
  }

  if (isError && !isFetching) {
    return (
      <Layout>
        <ErrorFallback error={error} />
      </Layout>
    )
  }

  return (
    <Layout>
      <HStack className="w-full justify-start items-start gap-2 flex-wrap">
        <Text className="text-typography-400 font-semibold text-md me-2">{formatDate(lecture?.createdAt!)}</Text>
        {lecture?.tags ? <LectureTags tags={lecture?.tags} /> : null}
      </HStack>
      <VStack className="gap-3">
        <Heading size="xl" className="capitalize text-typography-800">{lecture?.title}</Heading>
        <TimeInfo lecture={lecture!} />
        <TypeInfo lecture={lecture!} />
      </VStack>
      <Text className="text-typography-500 mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae fuga doloribus, architecto excepturi alias corrupti enim quam reprehenderit quibusdam rem?</Text>
      <Lecturer lecture={lecture!} />
      <Box className="absolute flex-row gap-2 items-center" style={{ bottom: 10, right: 10 }}>
        <Icon as={Eye} className="color-typography-100" />
        <Text className="text-typography-100">{lecture?.metrics.timesVisited}</Text>
      </Box>
    </Layout>
  )
}

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Card size="md" variant="elevated" className="m-3 p-[1.25rem] shadow-2xl w-full gap-8">
      {children}
    </Card>
  )
}

export default LectureInformation;