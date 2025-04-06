import { Icon } from "@/components/ui/icon";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { Text } from "@/components/ui/text";
import { LectureSearchParams, SortKey } from "@/lib/schemas/lecture-search-params-schema";
import clsx from "clsx";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Check, ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";


const sortArr = [
  { title: "Mais Recentes", key: SortKey.NEWEST },
  { title: "Mais Vistos", key: SortKey.MOST_VIEWED },
  { title: "Mais Compartilhados", key: SortKey.MOST_SHARED },
]

const INITIAL_SORT_KEY = SortKey.NEWEST;

const LecturesSort = () => {
  const router = useRouter();
  const { sort } = useLocalSearchParams<{ sort?: string }>();
  const [selectedSort, setSelectedSort] = useState<LectureSearchParams["sort"]>(() => sort ? (sort as LectureSearchParams["sort"]) : INITIAL_SORT_KEY);

  const handleSort = (sort: LectureSearchParams["sort"]) => {
    router.setParams({ sort })
    setSelectedSort(sort);
  }


  return (
    <Menu
      placement="bottom"
      offset={5}
      className="ml-4"
      trigger={({ ...triggerProps }) => {
        return (
          <TouchableOpacity {...triggerProps} className="flex flex-row items-end gap-1">
            <Text className="text-typography-500 font-semibold">Sort</Text>
            <Icon as={ChevronDown} className="mb-[1px] text-typography-500" size="sm" />
          </TouchableOpacity>
        );
      }}
    >
      {sortArr.map(sort => (
        <MenuItem key={sort.key} textValue={"Mais Recentes"} onPress={() => handleSort(sort.key)} className="gap-2">
          <MenuItemLabel size="sm" className={clsx("text-typography-500", { "text-typography-950": selectedSort === sort.key })}>{sort.title}</MenuItemLabel>
          {selectedSort === sort.key ? <Icon as={Check} size="2xs" className="mr-2 mt-1" /> : null}
        </MenuItem>
      ))}
    </Menu>
  );
}

export default LecturesSort;
