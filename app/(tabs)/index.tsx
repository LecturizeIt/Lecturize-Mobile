import SuspenseLoading from "@/components/suspense-loading";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { useAuthContext } from "@/contexts/auth-context";
import { Text } from "react-native";

export default function Index() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <SuspenseLoading />
  }

  return (
    <Box className="flex-1 justify-center items-center">
      <Heading className="color-purple-500 text-2xl">Lecturize It</Heading>
      <Text className="text-typography-950">{user ? user.email : "no user"}</Text>
    </Box>
  );
}
