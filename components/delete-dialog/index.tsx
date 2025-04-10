import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Trash2 } from "lucide-react-native";

type DeleteDialogProps = {
  onDelete: () => Promise<void>;
  isPending: boolean;
  onClose: () => void;
  isOpen: boolean;
  title?: string;
  description?: string;
};

const DeleteDialog = ({ onDelete, isPending, onClose, isOpen, description, title }: DeleteDialogProps) => {

  const handleDelete = async () => {
    onClose();
    await onDelete();
  }

  return (
    <>
      <AlertDialog isOpen={isOpen} onClose={onClose} size="md">
        <AlertDialogBackdrop />
        <AlertDialogContent className="w-full max-w-[350px] gap-4 items-center">
          <Box className="rounded-full h-[52px] w-[52px] bg-background-error items-center justify-center">
            <Icon as={Trash2} size="lg" className="stroke-error-500" />
          </Box>
          {title ? (
            <AlertDialogHeader>
              <Heading className="text-typography-950 font-semibold text-center" size="md">
                {title}
              </Heading>
            </AlertDialogHeader>
          ) : null}
          {description ? (
            <AlertDialogBody className="my-2">
              <Text size="sm" className="text-center">
                {description}
              </Text>
            </AlertDialogBody>
          ) : null}
          <AlertDialogFooter className="">
            <Button
              variant="outline"
              onPress={onClose}
              size="sm"
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button size="sm" onPress={handleDelete} action="negative" disabled={isPending}>
              <ButtonText style={{ color: "rgb(230, 230, 230)" }}>Delete</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteDialog;
