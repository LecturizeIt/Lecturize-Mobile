import LectureForm from "@/components/lecture-form";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Pressable, ScrollView, View } from "react-native";
import UpdateLecture from "./update-lecture";

const CreateLecture = forwardRef<ScrollView>(function CreateLecture(props, forwardedRef) {
  const { update } = useLocalSearchParams<{ update?: string }>();
  const router = useRouter();
  const ref = useRef<ScrollView>(null);

  useImperativeHandle(forwardedRef, () => ref.current as ScrollView);

  return (
    <>
      <ScrollView className='flex-1 px-[2rem] w-full'
        ref={ref}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center", minHeight: "100%", paddingBottom: 32, paddingTop: 48 }}
      >
        {update ? (
          <UpdateLecture scrollViewRef={ref} id={update} />
        ) : (
          <LectureForm scrollViewRef={ref} />
        )}
      </ScrollView>
      <Pressable className="absolute" style={{ top: 15, left: 15 }} onPress={() => router.dismiss()}>
        <View className="rounded-full bg-typography-50/90 items-center justify-center" style={{ width: 42, height: 42 }}>
          <Icon as={CloseIcon} size="lg" className="stroke-typography-500" />
        </View>
      </Pressable>
    </>
  );
})
export default CreateLecture;
