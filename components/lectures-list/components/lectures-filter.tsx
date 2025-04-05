import { Divider } from "@/components/ui/divider";
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader
} from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import clsx from "clsx";
import { ChevronDown, Filter, Minus } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LecturerSearchbar from "./lecturer-searchbar";
import TagsCheckbox from "./tags-checkbox";

const LecturesFilter = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showMoreTags, setShowMoreTags] = useState(false);
  const [showMoreLecturer, setShowMoreLecturer] = useState(true);

  return (
    <>
      <TouchableOpacity onPress={() => setShowDrawer(true)}>
        <Icon as={Filter} className="mb-1 text-typography-500 h-[17px] w-[17px]" />
      </TouchableOpacity>
      <Drawer
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false)
        }}
        anchor="right"
      >
        <DrawerBackdrop />
        <DrawerContent className="bg-background-card w-[85%]">
          <SafeAreaView className="">
            <DrawerHeader>
              <Heading size="md">Filtros</Heading>
              <DrawerCloseButton><Text className="text-typography-300">&#x2715;</Text></DrawerCloseButton>
            </DrawerHeader>
            <DrawerBody className="gap-4 " showsVerticalScrollIndicator={false}>
              <VStack className="pl-2 py-3">
                <TouchableOpacity onPress={() => setShowMoreTags(prev => !prev)}>
                  <HStack className="justify-between">
                    <Text className="font-semibold text-typography-500" size="sm">
                      Categorias
                    </Text>
                    <Icon as={ChevronDown} className={clsx("text-2xl text-typography-500", { "hidden": showMoreTags })} />
                    <Icon as={Minus} className={clsx("text-2xl text-typography-500", { "hidden": !showMoreTags })} />
                  </HStack>
                </TouchableOpacity>
                <Divider className="mt-2 mb-4" />
                <VStack className="pl-3 gap-3" style={{ display: showMoreTags ? "flex" : "none" }}>
                  <TagsCheckbox />
                </VStack>
              </VStack>
              <VStack className="pl-2 py-3">
                <TouchableOpacity onPress={() => setShowMoreLecturer(prev => !prev)}>
                  <HStack className="justify-between">
                    <Text className="font-semibold text-typography-500" size="sm">
                      Palestrante
                    </Text>
                    <Icon as={ChevronDown} className={clsx("text-2xl text-typography-500", { "hidden": showMoreLecturer })} />
                    <Icon as={Minus} className={clsx("text-2xl text-typography-500", { "hidden": !showMoreLecturer })} />
                  </HStack>
                </TouchableOpacity>
                <Divider className="mt-2 mb-4" />
                <VStack style={{ display: showMoreLecturer ? "flex" : "none" }}>
                  <LecturerSearchbar />
                </VStack>
              </VStack>
            </DrawerBody>
          </SafeAreaView>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default LecturesFilter;
