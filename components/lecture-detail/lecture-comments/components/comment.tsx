import TagBadge from "@/components/tag-badge";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import WithAuthorization from "@/components/with-authorization";
import { useAuthContext } from "@/contexts/auth-context";
import { UserSummary } from "@/types/auth";
import { Lecture, LectureComment } from "@/types/lecture";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from 'date-fns/locale';
import CommentSettingsMenu from "./comment-settings-menu";

type CommentProps = {
  comment: LectureComment;
  lecture: Lecture;
}

const Comment = ({ comment: { text, user: commentator, createdAt, id }, lecture: { id: lectureId, organizer: lectureOwner } }: CommentProps) => {
  const { user: currentUser, isAdmin } = useAuthContext();
  const canSeeSettings = commentator.id === currentUser?.id || isAdmin || currentUser?.id === lectureOwner.id;
  return (
    <VStack className="pb-5">
      <HStack className="gap-2 w-full items-center">
        <TagBadge name={commentator.username} withIcon={false} className="min-w-[50px]" />
        <Text className="text-typography-400 text-sm">{formatDistanceToNow(new Date(createdAt), { locale: ptBR, addSuffix: true, includeSeconds: true })}</Text>
        <WithAuthorization isAuthorized={canSeeSettings}>
          <CommentSettingsMenu commentId={id} lectureId={lectureId} />
        </WithAuthorization>
      </HStack>
      <HStack>
        <Text className="text-typography-800">{text}</Text>
      </HStack>
    </VStack>
  )
}

export default Comment;
