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
import { Text } from "@/components/ui/text"
import { LogOut } from "lucide-react-native"
import { useState } from "react"
import { Icon } from "../ui/icon"

const LogoutDialog = ({ handleLogout }: { handleLogout: () => Promise<void> }) => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const handleClose = () => setShowAlertDialog(false);

  const handleAction = async () => {
    await handleLogout(); 
    handleClose();
  }

  return (
    <>
      <Button variant='outline' action="negative" onPress={() => setShowAlertDialog(true)}>
        <ButtonText>Logout</ButtonText>
      </Button>
      <AlertDialog isOpen={showAlertDialog} onClose={handleClose}>
        <AlertDialogBackdrop />
        <AlertDialogContent className="w-full max-w-[350px] gap-4 items-center">
          <Box className="rounded-full h-[52px] w-[52px] bg-background-error items-center justify-center">
            <Icon as={LogOut} size="lg" className="stroke-error-500" />
          </Box>
          <AlertDialogHeader>
            <Heading size="md">Log out?</Heading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm" className="text-center">
              Tem certeza que deseja sair?
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className="mt-5">
            <Button
              size="sm"
              action="negative"
              onPress={handleAction}
              className="w-[100px]"
              variant="outline"
            >
              <ButtonText>Sair</ButtonText>
            </Button>
            <Button
              variant="outline"
              onPress={handleClose}
              size="sm"
              className="w-[100px]"
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default LogoutDialog;
