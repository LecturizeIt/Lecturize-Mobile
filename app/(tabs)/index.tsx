import { useThemeContext } from "@/contexts/theme-provider";
import { Pressable, Text, TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="color-red-400 text-xl">Lecturize It</Text>
    </SafeAreaView>
  );
}
