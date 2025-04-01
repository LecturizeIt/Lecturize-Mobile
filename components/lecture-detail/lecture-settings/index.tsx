import { Button, ButtonIcon } from "@/components/ui/button"
import {
  Icon,
  SettingsIcon
} from "@/components/ui/icon"
import {
  Menu,
  MenuItem,
  MenuItemLabel,
  MenuSeparator,
} from "@/components/ui/menu"
import { useRouter } from "expo-router"
import { Ellipsis, Trash2 } from "lucide-react-native"
import { useState } from "react"
import { StyleSheet } from "react-native"
import DeleteLectureAlertDialog from "./delete-lecture-alert-dialog"

const LectureSettings = ({ id }: { id: string }) => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const router = useRouter();

  return (
    <>
      <Menu
        offset={5}
        placement="bottom"
        trigger={({ ...triggerProps }) => {
          return (
            <Button size="lg" variant="link" {...triggerProps} style={styles.settings}>
              <ButtonIcon as={Ellipsis} className="h-[25px] w-[25px]" />
            </Button>
          );
        }}
      >
        <MenuItem
          key="Account Settings"
          textValue="Account Settings"
          className="p-2 min-w-[225px]"
          onPress={() => router.push(`/create-lecture?update=${id}`)}
        >
          <Icon as={SettingsIcon} size="sm" className="mr-2" />
          <MenuItemLabel size="sm">Editar Palestra</MenuItemLabel>
        </MenuItem>
        <MenuSeparator />
        <MenuItem key="Delete Lecture" textValue="Help Centre" className="p-2" onPress={() => setShowAlertDialog(true)}>
          <Icon as={Trash2} size="sm" className="mr-2" />
          <MenuItemLabel size="sm">Deletar Palestra</MenuItemLabel>
        </MenuItem>
      </Menu>
      <DeleteLectureAlertDialog id={id} setShowAlertDialog={setShowAlertDialog} showAlertDialog={showAlertDialog} />
    </>
  )
}

export default LectureSettings;

const styles = StyleSheet.create({
  settings: {
    position: "absolute",
    top: -35,
    left: "50%"
  },
})