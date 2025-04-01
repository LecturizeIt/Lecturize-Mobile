import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog"
import { Box } from "@/components/ui/box"
import { Button, ButtonText } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Icon } from "@/components/ui/icon"
import { Text } from "@/components/ui/text"
import { useDeleteLectureImageMutation } from "@/lib/mutations/lecture-mutations"
import { Trash2 } from "lucide-react-native"
import { useState } from "react"

type DeleteLectureAlertDialogProps = {
  id: string,
  setUpdateHasImage: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteLectureImageDialog = ({ id, setUpdateHasImage }: DeleteLectureAlertDialogProps) => {
  const lectureDeleteImageMutation = useDeleteLectureImageMutation();
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const handleClose = () => setShowAlertDialog(false);

  const handleDelete = async () => {
    await lectureDeleteImageMutation.mutateAsync(id, {
      onSuccess: () => {
        setUpdateHasImage(false);
      }
    });
    handleClose();
  }
  return (
    <>
      <Button className='mt-4 w-full max-w-[150px] mx-auto' variant='outline' action='negative' size='xs' onPress={() => setShowAlertDialog(true)}>
        <ButtonText className=''>
          Apagar imagem atual
        </ButtonText>
      </Button>
      <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
        <AlertDialogBackdrop />
        <AlertDialogContent className="w-full max-w-[350px] gap-4 items-center">
          <Box className="rounded-full h-[52px] w-[52px] bg-background-error items-center justify-center">
            <Icon as={Trash2} size="lg" className="stroke-error-500" />
          </Box>
          <AlertDialogHeader>
            <Heading className="text-typography-950 font-semibold text-center" size="md">
              Tem certeza que deseja apagar a imagem da palestra atual?
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text size="sm" className="text-center">
              Deletar a imagem da palestra irá removê-la permanentemente.
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
            <Button size="sm" onPress={handleDelete} action="negative" disabled={lectureDeleteImageMutation.isPending}>
              <ButtonText style={{ color: "rgb(230, 230, 230)" }}>Delete</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteLectureImageDialog;
