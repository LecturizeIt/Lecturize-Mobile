import CreateLecture from "@/components/create-lecture";
import ProtectedRoute from "@/components/protected-route";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateLecturePage = () => {
  return (
    <ProtectedRoute directTo={"/login"} redirectAfter>
      <SafeAreaView className="flex-1">
        <View className="flex flex-1 w-full relative">
          <CreateLecture />
        </View>
      </SafeAreaView>
    </ProtectedRoute>
  );
}

export default CreateLecturePage;