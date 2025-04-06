import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { ACCEPTED_MIME_TYPES } from '@/constants';
import { LectureFormValues } from '@/lib/schemas/lecture-schema';
import { Lecture } from '@/types/lecture';
import { encodeRFC5987ValueChars } from '@/utilities/utils';
import * as DocumentPicker from 'expo-document-picker';
import { Eye, EyeOffIcon, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { Image } from "expo-image";
import Logo from "@/assets/images/logo.png";
import DeleteLectureImageDialog from './delete-lecture-image-dialog';

type DocumentPickerInputProps = {
  image?: DocumentPicker.DocumentPickerAsset,
  setImage: React.Dispatch<React.SetStateAction<DocumentPicker.DocumentPickerAsset | undefined>>,
  scrollViewRef: React.RefObject<ScrollView>,
  form: UseFormReturn<LectureFormValues>,
  isDisabled: boolean,
  update?: Lecture;
}

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const DocumentPickerInput = ({
  image,
  setImage,
  scrollViewRef,
  form: { control, formState: { errors }, setValue },
  isDisabled,
  update
}: DocumentPickerInputProps) => {
  const [showImage, setShowImage] = useState(true);
  const isUpdateAndHasImage = !!update && !!update.image;

  const handleDocumentPicker = async () => {
    const response = await DocumentPicker.getDocumentAsync({
      multiple: false,
      type: ACCEPTED_MIME_TYPES,
    });

    if (response.canceled) return;

    const asset = response.assets[0];
    asset.name = encodeRFC5987ValueChars(asset.name);
    setImage(asset);
    setValue("image", asset);
  }

  const handleResetImage = () => {
    setValue("image", undefined);
    setImage(undefined);
  }

  const handleScrollToEnd = () => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  }

  const handleShowImage = () => {
    setShowImage(prev => !prev);
    const id = setTimeout(() => {
      handleScrollToEnd();
    }, 500);
    return () => clearTimeout(id);
  }

  return (
    <>
      <Text className="text-typography-900" size="md">Imagem</Text>
      {(image || isUpdateAndHasImage) && (
        <>
          <Button variant='link' onPress={handleShowImage}>
            <ButtonText className='text-typography-900 underline'>{showImage ? "Hide image" : "Show Image"}</ButtonText>
            <ButtonIcon as={showImage ? EyeOffIcon : Eye} size='sm' className='mt-1' />
          </Button>
          {showImage && (
            <Box className='w-full relative justify-center items-center'>
              {image ? (
                <Button size='sm' className='rounded-full w-fit mb-2' variant='link' onPress={() => handleResetImage()}>
                  <ButtonIcon as={Trash2} size='lg' color='red' />
                </Button>
              ) : null}
              {(isUpdateAndHasImage && !image) ? (
                <>
                  <DeleteLectureImageDialog id={update!.id} />
                </>
              ) : null}
              <Image
                source={!image ? `${BASE_URL}/images/${update?.image?.fileName}` : image}
                className="w-full h-[200px]"
                contentFit="contain"
                style={styles.image}
                placeholder={Logo}
                transition={200}
                cachePolicy={"none"}
              />
            </Box>
          )}
        </>
      )}
      <Controller
        control={control}
        name="image"
        render={({ field }) => (
          <>
            <Input className="w-full mt-4">
              <Pressable className='w-full' onPress={handleDocumentPicker} disabled={isDisabled}>
                <InputField
                  type="text"
                  placeholder={"Imagem de exposição da sua palestra"}
                  editable={false}
                  value={image ? image?.name : update?.image?.fileName}
                />
              </Pressable>
            </Input>
          </>
        )}
      />
      {errors.image && (
        <Text className='color-error-500'>{errors.image.message?.toString()}</Text>
      )}
    </>
  )
}

export default DocumentPickerInput;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200
  }
})