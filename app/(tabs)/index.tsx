import { useAuthContext } from "@/contexts/auth-context";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useAuthContext();
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="color-red-400 text-xl">Lecturize It</Text>
      <Text className="color-green-500">{user ? user.email : "no user"}</Text>
    </SafeAreaView>
  );
}
