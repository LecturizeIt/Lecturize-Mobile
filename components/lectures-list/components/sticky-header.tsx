import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { getThemeColor } from "@/utilities/utils";
import clsx from "clsx";
import { useColorScheme } from "nativewind";
import LecturesFilter from "./lectures-filter";
import LecturesSearchBar from "./lectures-searchbar";
import SortSelect from "./sort-select";


const StickyHeader = ({ className }: { className?: string }) => {
  const { colorScheme } = useColorScheme();
  return (
    <Box className={clsx("shadow-none w-full elevation-xl pt-4", className)} style={{
      backgroundColor: getThemeColor("background", colorScheme)
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
