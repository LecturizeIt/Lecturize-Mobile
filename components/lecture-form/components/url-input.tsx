import { LectureFormValues } from "@/lib/schemas/lecture-schema";
import { Controller, UseFormReturn } from "react-hook-form";
import { Input, InputField } from "../../ui/input";
import { Text } from "../../ui/text";

const UrlInput = ({ form: { control, formState: { errors } } }: { form: UseFormReturn<LectureFormValues> }) => {
  return (
    <>
      <Text className="text-typography-900" size="sm">URL</Text>
      <Controller
        control={control}
        name="url"
        render={({ field }) => (
          <Input isInvalid={Boolean(errors.url)}>
            <InputField
              type="text"
              placeholder="URL da palestra"
              onChangeText={field.onChange}
              value={field.value}
              onBlur={field.onBlur}
            />
          </Input>
        )}
      />
      {errors.url && (
        <Text className='color-error-500'>{errors.url.message}</Text>
      )}
    </>
  )
}

export default UrlInput;
