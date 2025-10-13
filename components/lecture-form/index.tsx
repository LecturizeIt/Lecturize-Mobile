import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText } from '@/components/ui/form-control';
import { DATE_NOW, DATE_NOW_PLUS_TIRTHY } from "@/constants";
import useCustomToast from '@/hooks/use-custom-toast';
import { useLectureImageMutation, useLecturesMutation, useLectureUpdateMutation } from '@/lib/mutations/lecture-mutations';
import { LectureFormValues, lectureSchema } from "@/lib/schemas/lecture-schema";
import { Lecture, LectureTypes, Tag } from "@/types/lecture";
import { getApiFormattedLectureType } from '@/utilities/utils';
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from 'axios';
import { DocumentPickerAsset } from 'expo-document-picker';
import { useRouter } from 'expo-router';
import { AlertCircle } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView } from 'react-native';
import colors from 'tailwindcss/colors';
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
import { Card } from '../ui/card';

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

type LectureFormProps = {
  scrollViewRef: React.RefObject<ScrollView>
  update?: Lecture
}

const LectureForm = ({ scrollViewRef, update }: LectureFormProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [image, setImage] = useState<DocumentPickerAsset | undefined>(undefined);
  const [startsAt, setStartsAt] = useState(new Date(defaultValues.startsAt));
  const [endsAt, setEndsAt] = useState(new Date(defaultValues.endsAt));

  const lectureMutation = useLecturesMutation();
  const lectureUpdateMutation = useLectureUpdateMutation();
  const lectureImageMutation = useLectureImageMutation();

  const isPending = (lectureMutation.isPending || lectureImageMutation.isPending || lectureUpdateMutation.isPending);

  const { showSuccessToast } = useCustomToast();
  const router = useRouter();

  const initialValues = useMemo(() => {
    if (update) {
      const { id, metrics, organizer, type, url, address, maximumCapacity, image, ...rest } = update;
      setSelectedTags(rest.tags);
      setStartsAt(new Date(rest.startsAt));
      setEndsAt(new Date(rest.endsAt));
      return {
        ...rest,
        type: getApiFormattedLectureType(type as LectureTypes),
        url: url === null ? "" : url,
        address: address === null ? "" : address,
        maximumCapacity: maximumCapacity === null ? 0 : maximumCapacity,
        image: image?.fileName
      } as LectureFormValues;
    }
    return defaultValues;
  }, [update]);

  const form = useForm<LectureFormValues>({
    resolver: zodResolver(lectureSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const { errors } = form.formState;
  const { handleSubmit, } = form;
  const watchType = form.watch("type");

  useEffect(() => {
    if (Object.keys(errors).length) {
      scrollViewRef.current?.scrollTo({ y: 100 });
    }
    // eslint-disable-next-line
  }, [errors]);

  const onUpdateSubmit = (id: string, newLecture: LectureFormValues, image: any) => {
    lectureUpdateMutation.mutate({ id, newLecture }, {
      onSuccess: async ({ id }) => {
        if (image) {
          await lectureImageMutation.mutateAsync({ file: image, id });
        };
        showSuccessToast("Palestra atualizada com sucesso!");
        router.push({ pathname: "/lecture/[id]", params: { id } });
        form.reset();
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          const serverError = error.response?.data;
          form.setError("root", { message: serverError.detail });
        }
      },
    });
  }

  const onCreateSubmit = (newLecture: LectureFormValues, image: any) => {
    lectureMutation.mutate(newLecture, {
      onSuccess: async ({ id }) => {
        if (image) {
          await lectureImageMutation.mutateAsync({ file: image, id });
        };
        showSuccessToast("Palestra criada com sucesso!");
        router.push({ pathname: "/lecture/[id]", params: { id } });
        form.reset();
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          const serverError = error.response?.data;
          form.setError("root", { message: serverError.detail });
        }
      },
    });
  }

  const onSubmit = async (data: LectureFormValues) => {
    const lectureImage = data?.image;
    const formattedData: LectureFormValues = { ...data, image: undefined, };
    if (update) {
      onUpdateSubmit(update.id, formattedData, lectureImage);
      return;
    }
    onCreateSubmit(formattedData, lectureImage);
  };

  return (
    <>
      <Heading className='text-typography-950 mb-6' size="xl">{update ? 'Atualize sua palestra' : 'Divulgue sua palestra'}</Heading>
      <Card size="lg" variant="elevated" className="m-3 shadow-2xl w-full relative pb-5">
        <FormControl
          isInvalid={Boolean(errors.root)}
          isDisabled={isPending}
        >
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
              <StartsAtDatetimePickerInput
                setStartsAt={setStartsAt}
                startsAt={startsAt}
                form={form}
                isDisabled={isPending}
              />
            </VStack>

            <VStack space="xs">
              <EndsAtDatetimePickerInput
                endsAt={endsAt}
                setEndsAt={setEndsAt}
                form={form}
                isDisabled={isPending}
              />
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
              <TagsModal
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                form={form}
                isDisabled={isPending}
              />
            </VStack>

            <VStack className="justify-center gap-0">
              <DocumentPickerInput
                image={image}
                setImage={setImage}
                scrollViewRef={scrollViewRef}
                form={form}
                isDisabled={isPending}
                update={update}
              />
            </VStack>

            <Button
              className="mx-auto w-full max-w-[100px] items-center justify-center"
              onPress={handleSubmit(onSubmit)}
              action='accent'
              isDisabled={isPending}
            >
              {(isPending) ? (
                <ButtonSpinner color={colors.purple[500]} />
              ) : (
                <ButtonText className="text-typography-0">{update ? "Atualizar" : "Criar"}</ButtonText>
              )}
            </Button>
          </VStack>
        </FormControl>
      </Card>
    </>

  )
}

export default LectureForm;
