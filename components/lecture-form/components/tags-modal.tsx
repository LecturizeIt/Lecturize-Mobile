import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { CloseIcon, Icon } from "@/components/ui/icon";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader
} from "@/components/ui/modal";
import { useTagsQuery } from "@/lib/queries/lecture-queries";
import { Tag } from "@/types/lecture";
import { Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import ErrorMessage from "../../error-fallback/error-message";
import SuspenseLoading from "../../suspense-loading";
import { Box } from "../../ui/box";
import { Center } from "../../ui/center";
import { Input, InputField, InputIcon, InputSlot } from "../../ui/input";
import { Text } from "../../ui/text";
import { LectureFormValues } from "@/lib/schemas/lecture-schema";
import { UseFormReturn } from "react-hook-form";

type TagsModalProps = {
  selectedTags: Tag[],
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>,
  form: UseFormReturn<LectureFormValues>,
}

const TagsModal = ({ selectedTags, setSelectedTags, form: { control, formState: { errors }, setValue } }: TagsModalProps) => {
  const [showModal, setShowModal] = useState(false);
  const { data, error, isLoading, isError, isFetching } = useTagsQuery();
  const [search, setSearch] = useState<string>("");

  const filteredTags: Tag[] | undefined = data?.filter(tag => tag.name.toLowerCase().includes(search.toLowerCase()));

  const toggleSelectedTag = (tag: Tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => [...prev.filter(st => st !== tag)]);
      return;
    }
    setSelectedTags(prev => [...prev, tag]);
  }

  useEffect(() => {
    setValue("tags", selectedTags);
  }, [selectedTags, setValue]);

  return (
    <>
      <Text className="text-typography-900" size="sm">Categorias</Text>
      <Button variant="outline" onPress={() => setShowModal(true)}>
        <ButtonText>Categorias</ButtonText>
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        size="lg"
        useRNModal
      >
        <ModalBackdrop
          style={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
        />
        <ModalContent className="max-h-[300px] border-outline-500">
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
            <Box className="flex-row gap-4 flex-wrap justify-center w-full mt-3">
              <Input className="basis-full mb-2" size="sm">
                <InputSlot>
                  <InputIcon as={Search} className="ml-2" />
                </InputSlot>
                <InputField type="text" className="w-full" placeholder="Nome da categoria" onChangeText={setSearch} />
              </Input>
              {filteredTags?.map(tag => (
                <Button
                  key={tag.id}
                  variant={selectedTags.includes(tag) ? "solid" : "outline"}
                  className="w-fit"
                  size="xs"
                  onPress={() => toggleSelectedTag(tag)}
                >
                  <ButtonText>
                    {tag.name}
                  </ButtonText>
                </Button>
              ))}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TagsModal;
