import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { LectureFormValues } from '@/lib/schemas/lecture-schema';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Controller, UseFormReturn } from "react-hook-form";
import { Platform } from 'react-native';
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";

type EndsAtDatetimePickerInputProps = {
  form: UseFormReturn<LectureFormValues>,
  isDisabled: boolean,
  setEndsAt: React.Dispatch<React.SetStateAction<Date>>,
  endsAt: Date,
}

const EndsAtDatetimePickerInput = ({ form: { control, formState: { errors }, setValue }, isDisabled, endsAt, setEndsAt }: EndsAtDatetimePickerInputProps) => {
  const [mode, setMode] = useState<"date" | "time">("date");
  const [showEndsAtPicker, setShowEndsAtPicker] = useState(false);

  const toggleEndsAtPicker = () => {
    setShowEndsAtPicker(prev => !prev);
  }

  const onChangeEndsAt = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === "set" && Platform.OS === "android") {
      setEndsAt(date!);
      toggleEndsAtPicker();
      setValue("endsAt", date?.toISOString()!)
      return;
    }
    toggleEndsAtPicker();
  }
  return (
    <>
      <Text className="text-typography-900" size="sm">Data de Término</Text>
      {showEndsAtPicker && (
        <DateTimePicker
          mode={mode}
          display="spinner"
          value={endsAt}
          onChange={onChangeEndsAt}
          minimumDate={new Date()}
          is24Hour
        />
      )}
      <HStack className="w-full gap-2">
        <Button variant="link" isDisabled={isDisabled} onPress={() => {
          setMode("date");
          toggleEndsAtPicker();
        }}>
          <ButtonText className="underline">
            {endsAt.toDateString()}
          </ButtonText>
        </Button>
        <Button variant="link" isDisabled={isDisabled} onPress={() => {
          setMode("time");
          toggleEndsAtPicker();
        }}>
          <ButtonText className="underline">
            {endsAt.toLocaleTimeString("pt-BR")}
          </ButtonText>
        </Button>
      </HStack>

      <Controller
        control={control}
        name="endsAt"
        render={({ field }) => (
          <Input className="w-full hidden">
            <InputField
              type="text"
              placeholder="Data de início da palestra"
              editable={false}
              value={field.value}
            />
          </Input>
        )}
      />
      {errors.endsAt && (
        <Text className='color-error-500'>{errors.endsAt.message}</Text>
      )}
    </>
  )
}

export default EndsAtDatetimePickerInput;
