import { Heading } from "@/components/ui/heading";
import { useAuthContext } from "@/contexts/auth-context";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useAuthContext();
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Heading className="color-purple-500 text-2xl">Lecturize It</Heading>
      <Text className="text-typography-950">{user ? user.email : "no user"}</Text>
    </SafeAreaView>
  );
}
