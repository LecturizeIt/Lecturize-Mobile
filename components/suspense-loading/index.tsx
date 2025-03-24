import { ActivityIndicator } from "react-native";
import colors from "tailwindcss/colors";
import { Box } from "../ui/box";

const SuspenseLoading = () => {
  return (
    <Box className="flex-1 w-full justify-center items-center">
      <ActivityIndicator size="large" color={colors.purple["500"]} />
    </Box>
  )
}

export default SuspenseLoading;
