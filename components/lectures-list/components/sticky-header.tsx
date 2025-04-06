import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { CustomDarkTheme, CustomLightTheme } from "@/utilities/themeOptions";
import clsx from "clsx";
import { useColorScheme } from "nativewind";
import LecturesFilter from "./lectures-filter";
import LecturesSearchBar from "./lectures-searchbar";
import SortSelect from "./sort-select";


const StickyHeader = ({ className }: { className?: string }) => {
  const { colorScheme } = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  return (
    <Box className={clsx("shadow-none w-full elevation-xl pt-4", className)} style={{
      backgroundColor: isDarkTheme ? CustomDarkTheme.colors.background : CustomLightTheme.colors.background
    }}>
      <LecturesSearchBar />
      <HStack className="gap-3 my-3 items-center justify-between px-1">
        <SortSelect />
        <LecturesFilter />
      </HStack>
    </Box>
  )
}

export default StickyHeader;
