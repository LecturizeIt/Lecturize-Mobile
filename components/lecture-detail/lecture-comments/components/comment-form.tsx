import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText } from "@/components/ui/form-control";
import { Text } from "@/components/ui/text";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import { useLectureCommentMutation } from "@/lib/mutations/lecture-mutations";
import { commentSchema, LectureCommentFormValues } from "@/lib/schemas/lecture-comment-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { AlertCircle } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import colors from "tailwindcss/colors";

const defaultValues: LectureCommentFormValues = {
  text: "",
}

const CommentForm = ({ id }: { id: string }) => {
  const commentMutation = useLectureCommentMutation();

  const form = useForm<LectureCommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues,
    mode: "onSubmit"
  });

  const { errors } = form.formState;
  const { control, handleSubmit } = form;

  const onSubmit = (data: LectureCommentFormValues) => {
    commentMutation.mutate({ comment: data, id }, {
      onError: (error) => {
        if (isAxiosError(error) && error.response) {
          const serverError = error.response?.data;
          form.setError("root", { message: serverError.detail });
        } else form.setError("root", { message: error.message })
      },
      onSuccess: () => form.reset()
    });
  };

  return (
    <>
      <FormControl isInvalid={Boolean(errors.root)} className="gap-3">
        <FormControlError>
          <VStack className='w-full px-[1rem] gap-4'>
            <FormControlErrorIcon as={AlertCircle} className='mx-auto' />
            <FormControlErrorText className='w-full text-center'>
              {errors.root?.message}
            </FormControlErrorText>
          </VStack>
        </FormControlError>
        <VStack>
          <Controller
            control={control}
            name="text"
            render={({ field }) => (
              <Textarea size="md" isInvalid={Boolean(errors.text)} className="bg-background-card border border-typography-600">
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
        <Button
          className="mx-auto w-full max-w-[150px] justify-center border border-typography-600"
          onPress={handleSubmit(onSubmit)}
          isDisabled={commentMutation.isPending}
          size="sm"
          variant="outline"
        >
          {commentMutation.isPending ? (
            <ButtonSpinner color={colors.purple[500]} />
          ) : (
            <ButtonText className="text-typography-700">Enviar</ButtonText>
          )}
        </Button>
      </FormControl>
    </>
  )
}

export default CommentForm;
