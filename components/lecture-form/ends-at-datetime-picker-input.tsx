import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { TOMORROW } from '@/constants';
import { LectureFormValues } from '@/lib/schemas/lecture-schema';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Controller, UseFormReturn } from "react-hook-form";
import { Platform } from 'react-native';
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";

const EndsAtDatetimePickerInput = ({ form: { control, formState: { errors }, setValue } }: { form: UseFormReturn<LectureFormValues> }) => {
  const [mode, setMode] = useState<"date" | "time">("date");
  const [endsAt, setEndsAt] = useState(TOMORROW);
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
        <Button variant="link">
          <ButtonText className="underline" onPress={() => {
            setMode("date");
            toggleEndsAtPicker();
          }}>
            {endsAt.toDateString()}
          </ButtonText>
        </Button>
        <Button variant="link">
          <ButtonText className="underline" onPress={() => {
            setMode("time");
            toggleEndsAtPicker();
          }}>
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
