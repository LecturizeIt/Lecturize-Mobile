import LectureForm from "@/components/lecture-form";
import { Box } from "@/components/ui/box";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { useRouter } from 'expo-router';
import { useRef } from "react";
import { Pressable, ScrollView, View } from "react-native";

const Create = () => {
  const router = useRouter();
  const ref = useRef<ScrollView>(null);
  return (
    <ScrollView
      className="flex flex-1 w-full relative"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center", minHeight: "100%", paddingBottom: 32, paddingTop: 48 }}
      ref={ref}
    >
      <Box className='flex-1 items-center px-[2rem] w-full'>
        <LectureForm scrollViewRef={ref} />
      </Box>
      <Pressable className="absolute" style={{ top: 15, left: 15 }} onPress={() => router.dismiss()}>
        <View className="rounded-full bg-typography-50/90 items-center justify-center" style={{width: 42, height: 42}}>
          <Icon as={CloseIcon} size="lg" className="stroke-typography-500" />
        </View>
      </Pressable>
    </ScrollView>
  );
}

export default Create;