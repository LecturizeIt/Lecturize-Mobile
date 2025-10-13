import { LectureFormValues } from "@/lib/schemas/lecture-schema";
import { Controller, UseFormReturn } from "react-hook-form";
import { Text } from "../../ui/text";
import { Textarea, TextareaInput } from "../../ui/textarea";

const DescriptionTextareaInput = ({ form: { control, formState: { errors } } }: { form: UseFormReturn<LectureFormValues> }) => {
  return (
    <>
      <Text className="text-typography-900" size="sm">Descrição</Text>
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <Textarea isInvalid={Boolean(errors.description)}>
            <TextareaInput
              style={{ textAlignVertical: 'top' }}
              placeholder="Descrição da sua palestra"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
            />
          </Textarea>
        )}
      />
      {errors.description && (
        <Text className='color-error-500'>{errors.description.message}</Text>
      )}
    </>
  )
}

export default DescriptionTextareaInput;
