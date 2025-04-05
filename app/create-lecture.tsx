import CreateLecture from "@/components/create-lecture";
import ProtectedRoute from "@/components/protected-route";
import { View } from "react-native";

const CreateLecturePage = () => {
  return (
    <ProtectedRoute directTo={"/login"} redirectAfter>
      <View className="flex flex-1 w-full relative">
        <CreateLecture />
      </View>
    </ProtectedRoute>
  );
}

export default CreateLecturePage;