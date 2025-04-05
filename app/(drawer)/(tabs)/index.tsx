import LecturesList from "@/components/lectures-list";
import { Box } from "@/components/ui/box";

const LecturesPage = () => {


  return (
    <Box
      className="flex flex-1 px-10 w-full relative"
      style={{ alignItems: "center", minHeight: "100%", paddingBottom: 32, paddingTop: 8 }}
    >
      <LecturesList />
    </Box >
  )
}

export default LecturesPage;
