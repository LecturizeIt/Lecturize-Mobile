import { LectureFormValues } from "@/lib/schemas/lecture-schema";
import { Lecture } from "@/types/lecture";
import { Controller, UseFormReturn } from "react-hook-form";
import { Input, InputField } from "../../ui/input";
import { Text } from "../../ui/text";

const MaximumCapacityInput = ({ form: { control, formState: { errors }, setValue } }: { form: UseFormReturn<LectureFormValues> }) => {
  return (
    <>
      <Text className="text-typography-900" size="sm">Capacidade máxima</Text>
      <Controller
        control={control}
        name="maximumCapacity"
        render={({ field }) => (
          <Input isInvalid={Boolean(errors.maximumCapacity)}>
            <InputField
              maxLength={4}
              type="text"
              keyboardType='numeric'
              placeholder="URL da palestra"
              onChangeText={(text) => setValue("maximumCapacity", Number(text.replace(/[^0-9]/g, '')))}
              value={field.value?.toString()}
              onBlur={field.onBlur}
            />
          </Input>
        )}
      />
      {errors.maximumCapacity && (
        <Text className='color-error-500'>{errors.maximumCapacity.message}</Text>
      )}
    </>
  )
}

export default MaximumCapacityInput;
