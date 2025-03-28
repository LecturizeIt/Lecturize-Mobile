import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { VStack } from "@/components/ui/vstack";
import { Lecture } from "@/types/lecture";
import { GraduationCap } from "lucide-react-native";
import { Heading } from "../../ui/heading";
import { HStack } from "../../ui/hstack";
import { Text } from "../../ui/text";

const Lecturer = ({ lecture }: { lecture: Lecture }) => {
  return (
    <VStack space="2xl">
      <HStack space="md">
        <Avatar size="lg">
          <AvatarFallbackText>SS</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            }}
          />
        </Avatar>
        <VStack className="w-full justify-center">
          <HStack className="w-full flex-wrap gap-x-2">
            <Heading size="md">{lecture.lecturer}</Heading>
            <Badge size="sm" variant="outline" className="bg-background-50 border-accent">
              <BadgeText className="capitalize text-accent">Verificado</BadgeText>
              <BadgeIcon as={GraduationCap} size="md" className=' ml-1 text-accent' />
            </Badge>
          </HStack>
          <Text size='sm'>Palestrante</Text>
        </VStack>
      </HStack>
    </VStack>
  );
}

export default Lecturer;
