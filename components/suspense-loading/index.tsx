import clsx from 'clsx';
import { ActivityIndicator } from "react-native";
import colors from "tailwindcss/colors";
import { Box } from "../ui/box";

const SuspenseLoading = ({ className, onLayout }: { className?: string, onLayout?: () => void }) => {
  return (
    <Box className={clsx("flex-1 w-full justify-center items-center", className)} onLayout={onLayout}>
      <ActivityIndicator size="large" color={colors.purple["500"]} />
    </Box>
  )
}

export default SuspenseLoading;
