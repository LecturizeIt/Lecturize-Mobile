import { Button, ButtonText } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { CircleIcon } from "@/components/ui/icon"
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader
} from "@/components/ui/modal"
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { Theme } from "@/types/theme"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Monitor, Moon, Sun, X } from "lucide-react-native"
import { useColorScheme } from "nativewind"
import React, { useEffect, useState } from "react"
import { HStack } from "../ui/hstack"
import { Icon } from "../ui/icon"

const AppearanceModal = () => {
  const { setColorScheme } = useColorScheme();
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState<Theme>("light");

  const toggleTheme = async (radioValue: Theme) => {
    setValue(radioValue)
    setColorScheme(radioValue);
    await AsyncStorage.setItem("theme", radioValue);
  };

  useEffect(() => {
    const setThemeFromStorage = async () => {
      const storageTheme = await AsyncStorage.getItem("theme") as Theme ?? "system";
      setValue(storageTheme);
    }

    setThemeFromStorage();
  }, []);

  return (
    <>
      <Button variant="outline" onPress={() => setShowModal(true)}>
        <ButtonText>Aparência</ButtonText>
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
        }}
      >
        <ModalBackdrop />
        <ModalContent className="max-w-[305px] items-center">
          <ModalHeader className="w-full flex justify-end">
            <ModalCloseButton className="">
              <Icon as={X} className="size-4 stroke-background-500" />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody className="mt-0 mb-4 w-full">
            <Heading size="md" className="text-typography-950 mb-2">
              Mudar aparência
            </Heading>
            <Text size="sm" className="text-typography-500">
              Preferências de Tema
            </Text>
            <RadioGroup value={value} onChange={toggleTheme} className="mt-3">
              <VStack space="sm">
                <Radio value="light">
                  <RadioIndicator>
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel>
                    <HStack className="items-center gap-2">
                      <Text>Light</Text>
                      <Icon as={Sun} size="md" />
                    </HStack>
                  </RadioLabel>
                </Radio>
                <Radio value="dark">
                  <RadioIndicator>
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel>
                    <HStack className="items-center gap-2">
                      <Text>Dark</Text>
                      <Icon as={Moon} size="md" />
                    </HStack>
                  </RadioLabel>
                </Radio>
                <Radio value="system">
                  <RadioIndicator>
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel>
                    <HStack className="items-center gap-2">
                      <Text>System</Text>
                      <Icon as={Monitor} size="md" />
                    </HStack>
                  </RadioLabel>
                </Radio>
              </VStack>
            </RadioGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AppearanceModal;
