import { Button, ButtonText } from '@/components/ui/button';
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText } from '@/components/ui/form-control';
import { TODAY, TOMORROW } from "@/constants";
import { LectureFormValues, lectureSchema } from "@/lib/schemas/lecture-schema";
import { Tag } from "@/types/lecture";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react-native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Heading } from "../ui/heading";
import { VStack } from "../ui/vstack";
import AddressInput from './address-input';
import DescriptionTextareaInput from "./description-textarea-input";
import EndsAtDatetimePickerInput from "./ends-at-datetime-picker-input";
import LecturerInput from "./lecturer-input";
import MaximumCapacityInput from './maximum-capacity-input';
import StartsAtDatetimePickerInput from "./starts-at-datetime-picker-input";
import TagsModal from "./tags-modal";
import TitleInput from "./title-input";
import TypeSelectInput from './type-select-input';
import UrlInput from './url-input';

const defaultValues: LectureFormValues = {
  title: 'asdasd',
  lecturer: 'asdasd',
  description: 'asdasd',
  type: "ONLINE",
  startsAt: TODAY.toISOString(),
  endsAt: TOMORROW.toISOString(),
  url: "https://localhost.com",
  address: "asd",
  maximumCapacity: 0,
  tags: [],
}

const LectureForm = () => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const form = useForm<LectureFormValues>({
    resolver: zodResolver(lectureSchema),
    defaultValues,
    mode: "onSubmit",
  });


  const { errors } = form.formState;
  const { handleSubmit } = form;
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
            <TitleInput form={form} />
          </VStack>

          <VStack space="md">
            <LecturerInput form={form} />
          </VStack>

          <VStack space="md">
            <DescriptionTextareaInput form={form} />
          </VStack>

          <VStack space="xs">
            <StartsAtDatetimePickerInput form={form} />
          </VStack>

          <VStack space="xs">
            <EndsAtDatetimePickerInput form={form} />
          </VStack>

          <VStack space="md">
            <TypeSelectInput form={form} />
          </VStack>

          {(watchType === "ONLINE" || watchType === "HYBRID") && (
            <VStack space="md">
              <UrlInput form={form} />
            </VStack>
          )}

          {(watchType === "PRESENTIAL" || watchType === "HYBRID") && (
            <>
              <VStack space="md">
                <AddressInput form={form} />
              </VStack>

              <VStack space="md">
                <MaximumCapacityInput form={form} />
              </VStack>
            </>
          )}
          
          <VStack className="justify-center" space="md">
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
