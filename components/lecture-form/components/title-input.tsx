import { LectureFormValues } from "@/lib/schemas/lecture-schema";
import { Lecture } from "@/types/lecture";
import { Controller, UseFormReturn } from "react-hook-form";
import { Input, InputField } from "../../ui/input";
import { Text } from "../../ui/text";

const TitleInput = ({ form: { control, formState: { errors } } }: { form: UseFormReturn<LectureFormValues> }) => {
  return (
    <>
      <Text className="text-typography-900" size="sm">Título</Text>
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <Input isInvalid={Boolean(errors.title)} >
            <InputField
              type="text"
              placeholder="Título da palestra"
              onChangeText={field.onChange}
              value={field.value}
              onBlur={field.onBlur}
            />
          </Input>
        )}
      />
      {errors.title && (
        <Text className='color-error-500'>{errors.title.message}</Text>
      )}
    </>
  )
}

export default TitleInput;
