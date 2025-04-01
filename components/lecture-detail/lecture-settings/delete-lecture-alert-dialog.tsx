import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog"
import { Button, ButtonText } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"
import { Trash2 } from "lucide-react-native"
import { Box } from "@/components/ui/box"
import { Icon } from "@/components/ui/icon"
import { useLectureDeleteMutation } from "@/lib/mutations/lecture-mutations"

type DeleteLectureAlertDialogProps = {
  id: string,
  showAlertDialog: boolean,
  setShowAlertDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteLectureAlertDialog = ({ id, setShowAlertDialog, showAlertDialog }: DeleteLectureAlertDialogProps) => {
  const lectureDeleteMutation = useLectureDeleteMutation();

  const handleClose = () => setShowAlertDialog(false);

  const handleDelete = () => {
    handleClose();
    lectureDeleteMutation.mutate(id);
  }
  return (
    <>
      <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
        <AlertDialogBackdrop />
        <AlertDialogContent className="w-full max-w-[350px] gap-4 items-center">
          <Box className="rounded-full h-[52px] w-[52px] bg-background-error items-center justify-center">
            <Icon as={Trash2} size="lg" className="stroke-error-500" />
          </Box>
          <AlertDialogHeader>
            <Heading className="text-typography-950 font-semibold" size="md">
              Tem certeza que deseja deletar essa palestra?
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text size="sm">
              Deletar a palestra remove-a permanentemente e não é possível anular a ação.
              Porfavor, confirme caso queira prosseguir.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className="">
            <Button
              variant="outline"
              onPress={handleClose}
              size="sm"
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button size="sm" onPress={handleDelete} action="negative" disabled={lectureDeleteMutation.isPending}>
              <ButtonText style={{color:"rgb(230, 230, 230)"}}>Delete</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteLectureAlertDialog;
