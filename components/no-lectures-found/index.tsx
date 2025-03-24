import { Frown } from "lucide-react-native";
import { Dimensions, View } from "react-native";
import { Heading } from "../ui/heading";
import { Icon } from "../ui/icon";
import { VStack } from "../ui/vstack";

Dimensions.get("window")
const NoLecturesFound = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <VStack className="items-center gap-4">
        <Heading size="lg" className="text-typography-900">Nenhuma palestra econtrada...</Heading>
        <Icon as={Frown} className="ml-2" size="xl" />
      </VStack>
    </View>
  )
}

export default NoLecturesFound;
