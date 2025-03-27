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
import { ChevronDown } from "lucide-react-native";
import { Controller, UseFormReturn } from "react-hook-form";
import { Text } from "../../ui/text";

const TypeSelectInput = ({ form: { control, formState: { errors } } }: { form: UseFormReturn<LectureFormValues> }) => {
  return (
    <>
      <Text className="text-typography-900" size="sm">Formato</Text>
      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value} isInvalid={Boolean(errors.type)}>
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
        )}
      />
      {errors.type && (
        <Text className='color-error-500'>{errors.type.message}</Text>
      )}
    </>
  )
}

export default TypeSelectInput;
