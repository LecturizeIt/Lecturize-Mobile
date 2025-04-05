import clsx from 'clsx';
import { ActivityIndicator } from "react-native";
import colors from "tailwindcss/colors";
import { Box } from "../ui/box";

const SuspenseLoading = ({ className }: { className?: string }) => {
  return (
    <Box className={clsx("flex-1 w-full justify-center items-center", className)}>
      <ActivityIndicator size="large" color={colors.purple["500"]} />
    </Box>
  )
}

export default SuspenseLoading;
