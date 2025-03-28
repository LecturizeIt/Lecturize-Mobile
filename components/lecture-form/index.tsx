import { Button, ButtonText } from '@/components/ui/button';
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText } from '@/components/ui/form-control';
import { DATE_NOW, DATE_NOW_PLUS_TIRTHY } from "@/constants";
import useCustomToast from '@/hooks/use-custom-toast';
import { useLectureImageMutation, useLecturesMutation } from '@/lib/mutations/lecture-mutations';
import { LectureFormValues, lectureSchema } from "@/lib/schemas/lecture-schema";
import { Tag } from "@/types/lecture";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from 'axios';
import { DocumentPickerAsset } from 'expo-document-picker';
import { useRouter } from 'expo-router';
import { AlertCircle } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView } from 'react-native';
import { Heading } from "../ui/heading";
import { VStack } from "../ui/vstack";
import AddressInput from './components/address-input';
import DescriptionTextareaInput from "./components/description-textarea-input";
import DocumentPickerInput from './components/document-picker-input';
import EndsAtDatetimePickerInput from "./components/ends-at-datetime-picker-input";
import LecturerInput from "./components/lecturer-input";
import MaximumCapacityInput from './components/maximum-capacity-input';
import StartsAtDatetimePickerInput from "./components/starts-at-datetime-picker-input";
import TagsModal from "./components/tags-modal";
import TitleInput from "./components/title-input";
import TypeSelectInput from './components/type-select-input';
import UrlInput from './components/url-input';

const defaultValues: LectureFormValues = {
  title: 'asdasd',
  lecturer: 'asdasd',
  description: 'asdasd',
  type: "ONLINE",
  startsAt: DATE_NOW.toISOString(),
  endsAt: DATE_NOW_PLUS_TIRTHY.toISOString(),
  url: "https://localhost.com",
  address: "asd",
  maximumCapacity: 0,
  tags: [],
}

const LectureForm = ({ scrollViewRef }: { scrollViewRef: React.RefObject<ScrollView> }) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [image, setImage] = useState<DocumentPickerAsset | undefined>(undefined);
  const lectureMutation = useLecturesMutation();
  const lectureImageMutation = useLectureImageMutation();
  const router = useRouter();
  const { showSuccessToast } = useCustomToast();

  const form = useForm<LectureFormValues>({
    resolver: zodResolver(lectureSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const { errors, } = form.formState;
  const { handleSubmit, } = form;
  const watchType = form.watch("type");

  useEffect(() => {
    if (Object.keys(errors).length) {
      scrollViewRef.current?.scrollTo({ y: 100 });
    }
    // eslint-disable-next-line
  }, [errors]);

  const onSubmit = async (data: LectureFormValues) => {
    const lectureImage = data?.image;
    const formattedData: LectureFormValues = {
      ...data,
      image: undefined,
    };
    lectureMutation.mutate(formattedData, {
      onSuccess: async (lecture) => {
        if (lectureImage) {
          await lectureImageMutation.mutateAsync({ file: lectureImage, id: lecture.id }, {
            onError: () => { router.push({ pathname: "/lecture/[id]", params: { id: lecture.id } }); }
          });
        };
        showSuccessToast("Palestra criada com sucesso!");
        router.push({ pathname: "/lecture/[id]", params: { id: lecture.id } });
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          const serverError = error.response?.data;
          form.setError("root", { message: serverError.detail });
        }
      },
    });
  }

  return (
    <>
      <Heading className='text-typography-950 mb-6' size="xl">Divulgue sua palestra</Heading>
      <FormControl className="p-4 border rounded-lg border-outline-300 w-full" isInvalid={Boolean(errors.root)}>
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
            <TagsModal selectedTags={selectedTags} setSelectedTags={setSelectedTags} form={form} />
          </VStack>

          <VStack className="justify-center gap-0">
            <DocumentPickerInput image={image} setImage={setImage} scrollViewRef={scrollViewRef} form={form} />
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
