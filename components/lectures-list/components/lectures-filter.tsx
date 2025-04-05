import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ChevronDownIcon, ChevronUpIcon, Filter } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LecturerSearchbar from "./lecturer-searchbar";
import TagsCheckbox from "./tags-checkbox";

const ACCORDION_ITEMS = [
  {
    text: "Categorias",
    element: <TagsCheckbox />,
    key: "categorias"
  },
  {
    text: "Palestrante",
    element: <LecturerSearchbar />,
    key: "palestrante"
  }
];

const LecturesFilter = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [openedAccordions, setOpenedAccordions] = useState([ACCORDION_ITEMS[1].key]);

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
                <Accordion
                  size="md"
                  variant="unfilled"
                  type="multiple"
                  className="m-5"
                  value={openedAccordions}
                  onValueChange={(item) => setOpenedAccordions(item)}
                >
                  {ACCORDION_ITEMS.map(item => (
                    <AccordionItem value={item.key} key={item.key}>
                      <AccordionHeader>
                        <AccordionTrigger>
                          {({ isExpanded }) => {
                            return (
                              <>
                                <AccordionTitleText className="font-semibold text-typography-500 text-sm" size="sm">
                                  {item.text}
                                </AccordionTitleText>
                                {isExpanded ? (
                                  <AccordionIcon as={ChevronUpIcon} className="ml-3 text-typography-500" />
                                ) : (
                                  <AccordionIcon as={ChevronDownIcon} className="ml-3 text-typography-500" />
                                )}
                              </>
                            )
                          }}
                        </AccordionTrigger>
                      </AccordionHeader>
                      <Divider className="mt-2 mb-4" />
                      <AccordionContent>
                        {item.element}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </VStack>
            </DrawerBody>
          </SafeAreaView>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default LecturesFilter;
