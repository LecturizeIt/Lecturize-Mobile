import ErrorMessage from "@/components/error-fallback/error-message";
import Comment from "@/components/lecture-detail/lecture-comments/components/comment";
import SuspenseLoading from "@/components/suspense-loading";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useAuthContext } from "@/contexts/auth-context";
import { useLectureCommentsQuery, useLectureDetailQuery } from "@/lib/queries/lecture-queries";
import { FlashList } from "@shopify/flash-list";
import CommentForm from "./components/comment-form";

const LectureComments = ({ id }: { id: string }) => {
  const { data, isError, isLoading, error } = useLectureCommentsQuery(id);
  const lectureQuery = useLectureDetailQuery(id);
  const { isAuthenticated } = useAuthContext();

  if (isLoading || lectureQuery.isLoading) {
    return <SuspenseLoading />
  }

  if (isError) {
    return <ErrorMessage error={error} />
  }

  return (
    <>
      <Text className="self-center text-xl text-typography-600 font-semibold">Comentários</Text>

      {isAuthenticated ? (
        <Card className="w-full p-6">
          <CommentForm id={id} />
        </Card>
      ) : null}

      <Card className="w-full p-6">
        <FlashList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Comment comment={item} lecture={lectureQuery.data!} />}
          ListEmptyComponent={() => <Text className="text-typography-500 text-center">Esta palestra não possui nenhum comentário...</Text>}
          estimatedItemSize={21}
        />
      </Card>
    </>
  )
}

export default LectureComments;