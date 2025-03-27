import LecturesList from "@/components/lectures-list";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import { ScrollView } from "react-native";


const LecturesPage = () => {
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

      <Link href="/create-lecture" asChild>
        <Button className="w-full max-w-[150px] mt-[1.5rem] bg-purple-500 border border-purple-500 data-[active=true]:bg-transparent">
          <ButtonText style={{color: "#fff"}}>Comece agora!</ButtonText>
        </Button>
      </Link>

      <LecturesList />

    </ScrollView >
  )
}

export default LecturesPage;
