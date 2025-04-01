import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { ACCEPTED_MIME_TYPES } from '@/constants';
import { LectureFormValues } from '@/lib/schemas/lecture-schema';
import { LectureWithImage } from '@/types/lecture';
import * as DocumentPicker from 'expo-document-picker';
import { Eye, EyeOffIcon, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import DeleteLectureImageDialog from './delete-lecture-image-dialog';
import { encodeRFC5987ValueChars } from '@/utilities/utils';

type DocumentPickerInputProps = {
  image?: DocumentPicker.DocumentPickerAsset,
  setImage: React.Dispatch<React.SetStateAction<DocumentPicker.DocumentPickerAsset | undefined>>,
  scrollViewRef: React.RefObject<ScrollView>,
  form: UseFormReturn<LectureFormValues>,
  isDisabled: boolean,
  update?: LectureWithImage
}

const DocumentPickerInput = ({
  image,
  setImage,
  scrollViewRef,
  form: { control, formState: { errors }, setValue },
  isDisabled,
  update
}: DocumentPickerInputProps) => {
  const [showImage, setShowImage] = useState(true);
  const [updateHasImage, setUpdateHasImage] = useState(!!update?.image);

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
    handleScrollToEnd();
  }

  return (
    <>
      <Text className="text-typography-900" size="md">Imagem</Text>
      {image && (
        <>
          <Button variant='link' onPress={handleShowImage}>
            <ButtonText className='text-typography-900 underline'>{showImage ? "Hide image" : "Show Image"}</ButtonText>
            <ButtonIcon as={showImage ? EyeOffIcon : Eye} size='sm' className='mt-1' />
          </Button>
          {showImage && (
            <Box className='w-full relative justify-center items-center'>
              <Button size='sm' className='rounded-full w-fit mb-2' variant='link' onPress={() => handleResetImage()}>
                <ButtonIcon as={Trash2} size='lg' color='red' />
              </Button>
              <Image
                source={image}
                className="w-full h-[200px]"
                onLoadEnd={handleScrollToEnd}
                resizeMode='contain'
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
            {(updateHasImage && !image) ? (
              <>
                <DeleteLectureImageDialog id={update!.id} setUpdateHasImage={setUpdateHasImage} />
              </>
            ) : null}
            <Input className="w-full mt-4">
              <Pressable className='w-full' onPress={handleDocumentPicker} disabled={isDisabled}>
                <InputField
                  type="text"
                  placeholder={updateHasImage ? update?.image?.description : "Imagem de exposição da sua palestra"}
                  editable={false}
                  value={image?.name}
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