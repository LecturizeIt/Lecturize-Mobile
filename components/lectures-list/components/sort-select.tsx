import { ChevronDownIcon } from "@/components/ui/icon";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@/components/ui/select";
import { SortKey } from "@/lib/schemas/lecture-search-params-schema";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";

const sortArr = [
  { title: "Mais Recentes", key: SortKey.NEWEST },
  { title: "Mais Vistos", key: SortKey.MOST_VIEWED },
  { title: "Mais Compartilhados", key: SortKey.MOST_SHARED },
];

const INITIAL_SORT_KEY = SortKey.NEWEST;

const SortSelect = () => {
  const router = useRouter();
  const { sort } = useLocalSearchParams<{ sort?: string }>();
  const [selectedSort, setSelectedSort] = useState<SortKey>(() => sort ? (sort as SortKey) : INITIAL_SORT_KEY);

  const handleSelect = (key: SortKey) => {
    router.setParams({ sort: key })
    setSelectedSort(key);
  }

  return (
    <Select onValueChange={(e) => handleSelect(e as SortKey)} selectedValue={selectedSort} initialLabel="Mais Recentes">
      <SelectTrigger size="sm" className="p-0 m-0 h-[14px]" style={{ borderWidth: 0 }}>
        <SelectInput placeholder="Sort" className="py-0 m-0 pl-0 text-typography-600" />
        <SelectIcon className="mb-0 relative right-[7] text-typography-600" as={ChevronDownIcon} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {sortArr.map(({ key, title }) => (
            <SelectItem label={title} value={key} key={key} />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select >
  );
}

export default SortSelect