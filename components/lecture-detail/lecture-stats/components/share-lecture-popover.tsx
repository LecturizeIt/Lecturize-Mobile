import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Popover, PopoverArrow, PopoverBackdrop, PopoverBody, PopoverContent } from "@/components/ui/popover";
import { Text } from "@/components/ui/text";
import { Share2 } from "lucide-react-native";
import React from "react";

const ShareLecturePopover = ({handleLectureShare}:{handleLectureShare: () => void}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Popover
      isOpen={isOpen}
      onClose={handleClose}
      onOpen={handleOpen}
      placement="top" size="md"
      trigger={(triggerProps) => {
        return (
          <Button size="xs" className="w-full max-w-[120px]" variant="outline" onPress={handleLectureShare} {...triggerProps}>
            <ButtonText>Compartilhar</ButtonText>
            <ButtonIcon as={Share2} />
          </Button>
        );
      }}
    >
      <PopoverBackdrop />
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Text>Sexo gay e gostoso!</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ShareLecturePopover;