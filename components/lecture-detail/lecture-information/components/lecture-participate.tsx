import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/auth-context";
import { useLectureParticipateMutation, useLectureUnparticipateMutation } from "@/lib/mutations/lecture-mutations";
import { useUserParticipatingLectures } from "@/lib/queries/lecture-queries";
import colors from "tailwindcss/colors";

const LectureParticipate = ({ id }: { id: string }) => {
  const { isAuthenticated } = useAuthContext();

  const partipateMutation = useLectureParticipateMutation();
  const unparticipateLecture = useLectureUnparticipateMutation();
  const userParticipatingLectures = useUserParticipatingLectures();

  const handleParticipate = () => {
    partipateMutation.mutate(id);
  }

  const handleUnparticipate = () => {
    unparticipateLecture.mutate(id);
  }

  if (!isAuthenticated) return null;

  if (userParticipatingLectures.isLoading || userParticipatingLectures.isError) return null;

  const isParticipating = userParticipatingLectures.data?.some(lecture => Number(lecture.id) === Number(id));

  if (isParticipating) {
    return (
      <Button
        action="negative"
        variant="outline"
        onPress={handleUnparticipate}
        disabled={unparticipateLecture.isPending}
      >
        {unparticipateLecture.isPending ? (
          <ButtonSpinner color={colors.purple[500]} />
        ) : (
          <ButtonText>Deixar de participar</ButtonText>
        )}
      </Button>
    )
  }

  return (
    <>
      <Button
        action="accent"
        variant="solid"
        onPress={handleParticipate}
        disabled={partipateMutation.isPending}
      >
        {partipateMutation.isPending ? (
          <ButtonSpinner color={"#fff"} />
        ) : (
          <ButtonText>Participar</ButtonText>
        )}
      </Button>
    </>
  )
}

export default LectureParticipate;
