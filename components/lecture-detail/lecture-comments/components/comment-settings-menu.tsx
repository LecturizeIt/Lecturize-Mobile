import DeleteDialog from "@/components/delete-dialog"
import { Icon } from "@/components/ui/icon"
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu"
import { useCommentDeleteMutation } from "@/lib/mutations/lecture-mutations"
import { EllipsisVertical, Trash2 } from "lucide-react-native"
import { useState } from "react"
import { TouchableOpacity } from "react-native"

const CommentSettingsMenu = ({ commentId, lectureId }: { lectureId: string, commentId: string }) => {
  const deleteCommentMutation = useCommentDeleteMutation();
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const handleClose = () => setShowAlertDialog(false);

  return (
    <>
      <Menu
        placement="bottom right"
        offset={5}

        className="bg-background-theme"
        trigger={({ ...triggerProps }) => {
          return (
            <TouchableOpacity {...triggerProps} className="ms-auto">
              <Icon as={EllipsisVertical} className="ms-auto text-typography-400" />
            </TouchableOpacity>
          )
        }}
      >
        <MenuItem key="delete" textValue="delete" onPress={() => setShowAlertDialog(true)}>
          <Icon as={Trash2} size="md" className="mr-2" />
          <MenuItemLabel size="xl">Delete</MenuItemLabel>
        </MenuItem>
      </Menu>

      <DeleteDialog
        onDelete={() => deleteCommentMutation.mutateAsync({ lectureId, commentId })}
        isPending={deleteCommentMutation.isPending}
        onClose={handleClose}
        isOpen={showAlertDialog}
        title="Excluir comentário"
        description="Excluir seu comentário permanentemente?"
      />
    </>
  )
}

export default CommentSettingsMenu;
