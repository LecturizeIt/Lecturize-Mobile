import LectureForm from "@/components/lecture-form";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { useRef } from "react";
import { ScrollView } from "react-native";

const CreateLecturePage = () => {
  const ref = useRef<ScrollView>(null);
  return (
    <ScrollView
      className="flex flex-1 w-full"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center", minHeight: "100%", paddingBottom: 10, paddingTop: 32 }}
      ref={ref} 
    >
      <Box className='flex-1 items-center mt-[5rem] px-[2rem] w-full'>
        <LectureForm scrollViewRef={ref} />
      </Box>
    </ScrollView>
  );
}

export default CreateLecturePage;