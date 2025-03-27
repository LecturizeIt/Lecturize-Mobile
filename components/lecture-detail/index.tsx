import { useLectureDetailQuery } from "@/lib/queries/lecture-queries";
import { PropsWithChildren } from "react";
import SuspenseLoading from "../suspense-loading";
import { Card } from "../ui/card";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import { formatDate } from "@/utilities/utils";
import LectureTags from "./tags";

const LectureInformation = ({ id }: { id: string }) => {
  const { data: lecture, isLoading } = useLectureDetailQuery(id);

  if (isLoading) {
    return (
      <Layout>
        <SuspenseLoading />
      </Layout>
    )
  }

  return (
    <Layout>
      <Heading size="2xl">{lecture?.title}</Heading>
      <Text>{lecture?.description}</Text>
      <Text>Palestra criada às {formatDate(lecture?.createdAt!)}</Text>
      <Text>Palestra começa às {formatDate(lecture?.startsAt!)}</Text>
      <Text>Palestra termina às {formatDate(lecture?.endsAt!)}</Text>
      <Text>{lecture?.type}</Text>
      <Text>{lecture?.status}</Text>
      <LectureTags tags={lecture?.tags!} />
      <Text>Organizer: {lecture?.organizer.username}</Text>
      <Text>Vezes compartilhada: {lecture?.metrics.timesShared}</Text>
      <Text>Vezes visitada: {lecture?.metrics.timesVisited}</Text>
    </Layout>
  )
}

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Card size="md" variant="elevated" className="m-3 pb-[1rem] flex-1 shadow-2xl w-full">
      {children}
    </Card>
  )
}

export default LectureInformation;


