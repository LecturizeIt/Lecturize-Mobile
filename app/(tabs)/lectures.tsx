import LecturesList from "@/components/lectures-list";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { Suspense } from "react";
import { ScrollView } from "react-native";
import colors from "tailwindcss/colors";

const Lectures = () => {
  return (
    <ScrollView
      className="flex flex-1 px-5 w-full"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center", minHeight: "100%", paddingBottom: 10, paddingTop: 32 }}
    >
      <Heading className="text-typography-950 text-xl">
        Organize Suas Palestras de Forma Inteligente
      </Heading>
      <Text className="text-typography-950 text-sm font-medium w-full max-w-[220px] text-center mt-4">
        Simplifique suas palestras com ferramentas poderosas para gerenciar conteúdo, horários e mais.
      </Text>

      <Button className="w-full max-w-[150px] mt-[1.5rem] bg-purple-500">
        <ButtonText>Comece agora!</ButtonText>
      </Button>

      <Suspense fallback={<Spinner size="large" color={colors.purple[500]} />}>
        <Box className="flex-1 w-full">
          <LecturesList />
        </Box>
      </Suspense>
    </ScrollView>
  )
}

export default Lectures;
