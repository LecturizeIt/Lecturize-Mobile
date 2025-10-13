import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from '@/components/ui/input';
import { Text } from "@/components/ui/text";
import { LectureFormValues } from '@/lib/schemas/lecture-schema';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Controller, UseFormReturn } from "react-hook-form";
import { Platform } from 'react-native';

type StartsAtDatetimePickerInputProps = {
  form: UseFormReturn<LectureFormValues>,
  isDisabled: boolean,
  startsAt: Date,
  setStartsAt: React.Dispatch<React.SetStateAction<Date>>,
}

const StartsAtDatetimePickerInput = ({ form: { control, formState: { errors }, setValue }, isDisabled, setStartsAt, startsAt }: StartsAtDatetimePickerInputProps) => {
  const [mode, setMode] = useState<"date" | "time">("date");
  const [showStartsAtPicker, setShowStartsAtPicker] = useState(false);

  const toggleStartsAtPicker = () => {
    setShowStartsAtPicker(prev => !prev);
  }
  const onChangeStartsAt = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === "set" && Platform.OS === "android") {
      setStartsAt(date!);
      toggleStartsAtPicker();
      setValue("startsAt", date?.toISOString()!)
      return;
    }
    toggleStartsAtPicker();
  }
  return (
    <>
      <Text className="text-typography-900" size="sm">Data de início</Text>
      {showStartsAtPicker && (
        <DateTimePicker
          mode={mode}
          display="spinner"
          value={startsAt}
          onChange={onChangeStartsAt}
          minimumDate={new Date()}
          locale="pt-Br"
          is24Hour
        />
      )}
      <HStack className="w-full gap-2">
        <Button variant="link" size='md' isDisabled={isDisabled} onPress={() => {
          setMode("date");
          toggleStartsAtPicker();
        }}>
          <ButtonText className="underline">
            {startsAt.toDateString()}
          </ButtonText>
        </Button>
        <Button variant="link" size='md' isDisabled={isDisabled} onPress={() => {
          setMode("time");
          toggleStartsAtPicker();
        }}>
          <ButtonText className="underline">
            {startsAt.toLocaleTimeString("pt-BR")}
          </ButtonText>
        </Button>
      </HStack>

      <Controller
        control={control}
        name="startsAt"
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
      {errors.startsAt && (
        <Text className='color-error-500'>{errors.startsAt.message}</Text>
      )}
    </>
  )
}

export default StartsAtDatetimePickerInput;
