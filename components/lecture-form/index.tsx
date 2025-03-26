import { LectureFormValues, lectureSchema } from "@/lib/schemas/lecture-schema";
import { Tag } from "@/types/lecture";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText } from '@/components/ui/form-control';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Controller, useForm } from "react-hook-form";
import { VStack } from "../ui/vstack";
import { Text } from "../ui/text";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Platform, Pressable, ScrollView } from "react-native";
import colors from "tailwindcss/colors";
import { HStack } from "../ui/hstack";
import { addDays } from "date-fns";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from "@/components/ui/select"
import { AlertCircle, ChevronDown } from "lucide-react-native";
import { Heading } from "../ui/heading";
import TagsModal from "./tags-modal";

const today = new Date();
const tomorrow = addDays(today, 1);

const defaultValues: LectureFormValues = {
  title: 'asdasd',
  lecturer: 'asdasd',
  description: 'asdasd',
  type: "ONLINE",
  startsAt: today.toISOString(),
  endsAt: tomorrow.toISOString(),
  url: "https://localhost.com",
  address: "asd",
  maximumCapacity: 0,
  tags: [],
}

const LectureForm = () => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [mode, setMode] = useState<"date" | "time">("date");

  const [startsAt, setStartsAt] = useState(today);
  const [endsAt, setEndsAt] = useState(tomorrow);

  const [showStartsAtPicker, setShowStartsAtPicker] = useState(false);
  const [showEndsAtPicker, setShowEndsAtPicker] = useState(false);

  const toggleStartsAtPicker = () => {
    setShowStartsAtPicker(prev => !prev);
  }

  const toggleEndsAtPicker = () => {
    setShowEndsAtPicker(prev => !prev);
  }

  const form = useForm<LectureFormValues>({
    resolver: zodResolver(lectureSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const onChangeStartsAt = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === "set" && Platform.OS === "android") {
      setStartsAt(date!);
      toggleStartsAtPicker();
      setValue("startsAt", date?.toISOString()!)
      return;
    }
    toggleStartsAtPicker();
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

  const { errors } = form.formState;
  const { control, handleSubmit, setValue } = form;
  const watchType = form.watch("type");

  const onSubmit = async (data: LectureFormValues) => {
    console.log(data);
    const formattedData = {
      ...data,
      startsAt: "",//new Date(data.startsAt).toISOString(),
      endsAt: "",//new Date(data.endsAt).toISOString(),
      tags: selectedTags,
      image: undefined,
    };
  }

  return (
    <>
      <Heading className='text-typography-950 mb-6' size="xl">Divulgue sua palestra</Heading>
      <FormControl className="p-4 border rounded-lg border-outline-300 w-full" >
        <VStack space="xl">
          <FormControlError>
            <VStack className='w-full px-[1rem] gap-4'>
              <FormControlErrorIcon as={AlertCircle} className='mx-auto' />
              <FormControlErrorText className='w-full text-center'>
                {errors.root?.message}
              </FormControlErrorText>
            </VStack>
          </FormControlError>
          <VStack space="md">
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
          </VStack>

          <VStack space="md">
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
          </VStack>

          <VStack space="md">
            <Text className="text-typography-900" size="sm">Descrição</Text>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Textarea isInvalid={Boolean(errors.description)}>
                  <TextareaInput
                    style={{ textAlignVertical: 'top' }}
                    placeholder="Descrição da sua palestra"
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                  />
                </Textarea>
              )}
            />
            {errors.description && (
              <Text className='color-error-500'>{errors.description.message}</Text>
            )}
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-900" size="sm">Data de início</Text>
            {showStartsAtPicker && (
              <DateTimePicker
                mode={mode}
                display="spinner"
                value={startsAt}
                onChange={onChangeStartsAt}
                minimumDate={new Date()}
                locale="pt-Br"
              />
            )}
            <HStack className="w-full gap-2">
              <Button variant="link">
                <ButtonText className="underline" onPress={() => {
                  setMode("date");
                  toggleStartsAtPicker();
                }}>
                  {startsAt.toDateString()}
                </ButtonText>
              </Button>
              <Button variant="link">
                <ButtonText className="underline" onPress={() => {
                  setMode("time");
                  toggleStartsAtPicker();
                }}>
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
          </VStack>

          <VStack space="xs">
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
          </VStack>

          <VStack space="md">
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
          </VStack>

          {(watchType === "ONLINE" || watchType === "HYBRID") && (
            <VStack space="md">
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
            </VStack>
          )}

          {(watchType === "PRESENTIAL" || watchType === "HYBRID") && (
            <>
              <VStack space="md">
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
              </VStack>

              <VStack space="md">
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
              </VStack>
            </>
          )}
          <VStack className="justify-center" space="md">
            <Text>Categorias</Text>
            <TagsModal selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
          </VStack>
          <Button
            className="mx-auto w-full max-w-[100px] items-center justify-center"
            onPress={handleSubmit(onSubmit)}
          >
            <ButtonText>
              Criar
            </ButtonText>
          </Button>
        </VStack>
      </FormControl>
    </>

  )
}

export default LectureForm;
