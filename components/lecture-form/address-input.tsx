import { LectureFormValues } from "@/lib/schemas/lecture-schema";
import { Controller, UseFormReturn } from "react-hook-form";
import { Input, InputField } from "../ui/input";
import { Text } from "../ui/text";

const AddressInput = ({ form: { control, formState: { errors } } }: { form: UseFormReturn<LectureFormValues> }) => {
  return (
    <>
      <Text className="text-typography-900" size="sm">Endereço</Text>
      <Controller
        control={control}
        name="address"
        render={({ field }) => (
          <Input isInvalid={Boolean(errors.address)}>
            <InputField
              type="text"
              placeholder="Endereço da palestra"
              onChangeText={field.onChange}
              value={field.value}
              onBlur={field.onBlur}
            />
          </Input>
        )}
      />
      {errors.address && (
        <Text className='color-error-500'>{errors.address.message}</Text>
      )}
    </>
  )
}

export default AddressInput;
