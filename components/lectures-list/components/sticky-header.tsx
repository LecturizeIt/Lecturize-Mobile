import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { CustomDarkTheme, CustomLightTheme } from "@/utilities/themeOptions";
import clsx from "clsx";
import { useColorScheme } from "nativewind";
import LecturesFilter from "./lectures-filter";
import LecturesSearchBar from "./lectures-searchbar";
import LecturesSort from "./lectures-sort";


const StickyHeader = ({ className }: { className?: string }) => {
  const { colorScheme } = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  return (
    <Box className={clsx("shadow-none w-full", className)} style={{
      backgroundColor: isDarkTheme ? CustomDarkTheme.colors.background : CustomLightTheme.colors.background
    }}>
      <LecturesSearchBar />
      <HStack className="gap-3 my-4 items-end justify-between px-1">
        <LecturesSort />
        <LecturesFilter />
      </HStack>
    </Box>
  )
}

export default StickyHeader;
