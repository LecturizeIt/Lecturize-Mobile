import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useTagsQuery } from "@/lib/queries/lecture-queries";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

import SuspenseLoading from "@/components/suspense-loading";
import { useGlobalSearchParams, useRouter } from "expo-router";

const TagsCheckbox = () => {
  const { data: tags, isLoading } = useTagsQuery();
  const { tags: filterTags } = useGlobalSearchParams<{ tags?: string }>();
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    if (filterTags) return filterTags.split(",");
    return [];
  });
  const router = useRouter();

  if (isLoading) return <SuspenseLoading />

  const handleSelectTag = (keys: string[]) => {
    router.setParams({ tags: keys.join(",") });
    setSelectedTags(keys);
  }

  const handleClearTags = () => {
    router.setParams({ tags: "" });
    setSelectedTags([]);
  }

  return (
    <>
      <CheckboxGroup value={selectedTags} onChange={(keys) => handleSelectTag(keys)} className="gap-2">
        <TouchableOpacity className="w-[100px] mx-auto" onPress={handleClearTags}>
          <Text className="text-xs">Limpar Categorias</Text>
        </TouchableOpacity>
        {tags?.map(tag => (
          <Checkbox size="sm" value={tag.name} key={tag.id} >
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel className="text-typography-600">{tag.name}</CheckboxLabel>
          </Checkbox>
        ))}
      </CheckboxGroup>
    </>
  )
}

export default TagsCheckbox;
