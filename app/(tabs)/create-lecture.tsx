import LectureForm from "@/components/lecture-form";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { ScrollView } from "react-native";

const CreateLecturePage = () => {
  return (
    <ScrollView
      className="flex flex-1 w-full"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center", minHeight: "100%", paddingBottom: 10, paddingTop: 32 }}
    >
      <Box className='flex-1 items-center mt-[5rem] px-[2rem] w-full'>
        <Heading className='text-typography-950 mb-6' size="xl">Divulgue sua palestra</Heading>
        <LectureForm />
      </Box>
    </ScrollView>
  );
}

export default CreateLecturePage;