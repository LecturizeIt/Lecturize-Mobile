import WhatsAppImage from "@/assets/images/zap.png";
import InstagramImage from "@/assets/images/insta.svg";
import TwitterImage from "@/assets/images/twitter.svg";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Popover, PopoverArrow, PopoverBackdrop, PopoverBody, PopoverContent } from "@/components/ui/popover";
import * as Linking from 'expo-linking';
import { Share2 } from "lucide-react-native";
import React from "react";
import { Image } from "expo-image";

const ShareLecturePopover = ({ handleLectureShare }: { handleLectureShare: () => void }) => {
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
      placement="top left" size="md"
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
          <HStack className="gap-6">
            <Button size="xs" variant="link" action="positive" onPress={() => Linking.openURL("whatsapp://send?text=aaaaaaaaaaaa")}>
              <Image source={WhatsAppImage} style={{ width: 16, height: 16 }} className="w-[18px] h-[18px]" resizeMode="contain" />
            </Button>
            <Button size="xs" variant="link" action="positive" onPress={() => Linking.openURL("whatsapp://send?text=aaaaaaaaaaaa")}>
              <Image source={InstagramImage} style={{ width: 26, height: 26 }} className="w-[18px] h-[18px]" contentFit="cover" />
            </Button>
            <Button size="xs" variant="link" action="positive" onPress={() => Linking.openURL("whatsapp://send?text=aaaaaaaaaaaa")}>
              <Image source={TwitterImage} style={{ width: 16, height: 16 }} className="w-[18px] h-[18px]" resizeMode="contain" />
            </Button>
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ShareLecturePopover;