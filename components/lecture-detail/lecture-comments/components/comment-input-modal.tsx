import { Button, ButtonText } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { CloseIcon, CopyIcon, Icon } from "@/components/ui/icon"
import { Input, InputField } from "@/components/ui/input"
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "@/components/ui/modal"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { Textarea, TextareaInput } from "@/components/ui/textarea"
import { VStack } from "@/components/ui/vstack"
import { LectureCommentFormValues } from "@/lib/schemas/lecture-comment-schema"
import React from "react"
import { Controller, UseFormReturn } from "react-hook-form"
import { TouchableOpacity } from "react-native"

const CommentInputModal = ({ form: { control, formState: { errors } } }: { form: UseFormReturn<LectureCommentFormValues> }) => {
  const [showModal, setShowModal] = React.useState(false)
  return (
    <>
      <Button className="w-full" onPress={() => setShowModal(true)} variant="link">
        <Input variant="outline" size="lg" className="border border-accent w-full">
          <InputField placeholder="Escreva seu comentário..." editable={false} />
        </Input>
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
        }}
      >
        <ModalBackdrop
          style={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
        />
        <ModalContent className="max-w-[395px] bg-background-card px-6 pt-2">
          <ModalHeader className="items-start w-full">
            <Heading className="text-typography-800 mx-auto" size="sm">Comentário</Heading>
          </ModalHeader>
          <ModalBody
            className="mb-0"
            contentContainerClassName="space-between flex-row items-center"
          >
            <VStack className="w-full">
              <Controller
                control={control}
                name="text"
                render={({ field }) => (
                  <Textarea size="sm" isInvalid={Boolean(errors.text)} className="bg-background-card">
                    <TextareaInput
                      style={{ textAlignVertical: 'top' }}
                      placeholder="Escreva seu comentário"
                      value={field.value}
                      onChangeText={field.onChange}
                      onBlur={field.onBlur}
                    />
                  </Textarea>
                )}
              />
              {errors.text && (
                <Text className='color-error-500'>{errors.text.message}</Text>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CommentInputModal;
