import {
    Select,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectIcon,
    SelectInput,
    SelectItem,
    SelectPortal,
    SelectTrigger,
} from "@/components/ui/select";
import { LectureFormValues } from "@/lib/schemas/lecture-schema";
import { LectureTypes } from "@/types/lecture";
import { ChevronDown } from "lucide-react-native";
import { Controller, UseFormReturn } from "react-hook-form";
import { Text } from "../../ui/text";

const getLabel = (type: LectureFormValues["type"]) => {
  switch (type) {
    case ("HYBRID"):
      return LectureTypes.HYBRID;
    case ("ONLINE"):
      return LectureTypes.ONLINE;
    case ("PRESENTIAL"):
      return LectureTypes.PRESENTIAL;
  }
}

const TypeSelectInput = ({ form: { control, formState: { errors } } }: { form: UseFormReturn<LectureFormValues> }) => {
  return (
    <>
      <Text className="text-typography-900" size="sm">Formato</Text>
      <Controller
        control={control}
        name="type"
        render={({ field }) => {
          const label = getLabel(field.value);
          return (
            <Select onValueChange={field.onChange} selectedValue={field.value} isInvalid={Boolean(errors.type)} initialLabel={label}>
              <SelectTrigger size="md">
                <SelectInput placeholder="Select option" className="flex-1 pt-2" />
                <SelectIcon as={ChevronDown} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent className="p-2">
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Online" value="ONLINE" />
                  <SelectItem label="Presencial" value="PRESENTIAL" />
                  <SelectItem label="Híbrido" value="HYBRID" />
                </SelectContent>
              </SelectPortal>
            </Select>
          )
        }}
      />
      {errors.type && (
        <Text className='color-error-500'>{errors.type.message}</Text>
      )}
    </>
  )
}

export default TypeSelectInput;
