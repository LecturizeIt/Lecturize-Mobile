import { Controller, UseFormReturn } from "react-hook-form";
import { Text } from "../ui/text";
import { Input, InputField } from "../ui/input";
import { LectureFormValues } from "@/lib/schemas/lecture-schema";

const LecturerInput = ({ form: { control, formState: { errors } } }: { form: UseFormReturn<LectureFormValues> }) => {
  return (
    <>
      <Text className="text-typography-900" size="sm">Palestrante</Text>
      <Controller
        control={control}
        name="lecturer"
        render={({ field }) => (
          <Input isInvalid={Boolean(errors.lecturer)}>
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
      {errors.lecturer && (
        <Text className='color-error-500'>{errors.lecturer.message}</Text>
      )}
    </>
  )
}

export default LecturerInput;
