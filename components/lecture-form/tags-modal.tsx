import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { CloseIcon, Icon } from "@/components/ui/icon";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Tag } from "@/types/lecture";
import { useState } from "react";
import { Box } from "../ui/box";
import { useTagsQuery } from "@/lib/queries/lecture-queries";
import { FlatList } from "react-native";
import SuspenseLoading from "../suspense-loading";
import { Center } from "../ui/center";
import ErrorMessage from "../error-fallback/error-message";

type TagsModalProps = {
  selectedTags: Tag[],
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>
}

const TagsModal = ({ selectedTags, setSelectedTags }: TagsModalProps) => {
  const [showModal, setShowModal] = useState(false);
  const { data, error, isLoading, isError, isFetching } = useTagsQuery();

  return (
    <>
      <Box className="w-full">
        <Button onPress={() => setShowModal(true)}>
          <ButtonText>Categorias</ButtonText>
        </Button>
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          size="md"
        >
          <ModalBackdrop />
          <ModalContent className="max-h-[300px]">
            <ModalHeader>
              <Heading size="md" className="text-typography-950 pe-2">
                Escolha categorias para sua palestra
              </Heading>
              <ModalCloseButton>
                <Icon
                  as={CloseIcon}
                  size="md"
                  className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                renderItem={({ item: tag }) => (
                  <Button onPress={() => setShowModal(true)}>
                    <ButtonText>Tag</ButtonText>
                  </Button>
                )}
                ListHeaderComponent={() => {
                  return (
                    <>
                      {isLoading && !isError && (
                        <Center className="pt-6">
                          <SuspenseLoading />
                        </Center>
                      )}

                      {error && !isFetching && !isLoading && (
                        <Center className="pt-6">
                          <ErrorMessage error={error} />
                        </Center>
                      )}
                    </>
                  )
                }}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  )
}

export default TagsModal;
