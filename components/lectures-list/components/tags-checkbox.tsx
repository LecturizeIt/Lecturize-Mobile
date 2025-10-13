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
import { memo, useState } from "react";
import { TouchableOpacity } from "react-native";

import { useGlobalSearchParams, useRouter } from "expo-router";
import { Tag } from "@/types/lecture";

const TagsCheckbox = () => {
  const { data: tags, isLoading } = useTagsQuery();
  const { tags: filterTags } = useGlobalSearchParams<{ tags?: string }>();
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    if (filterTags) return filterTags.split(",");
    return [];
  });
  const router = useRouter();

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
          <CheckboxItem {...tag} key={tag.id} />
        ))}
      </CheckboxGroup>
    </>
  )
}

const CheckboxItem = memo(function CheckboxItem({ name }: Tag) {
  return (
    <Checkbox size="sm" value={name} className="mb-[2px]">
      <CheckboxIndicator>
        <CheckboxIcon as={CheckIcon} />
      </CheckboxIndicator>
      <CheckboxLabel className="text-typography-600">{name}</CheckboxLabel>
    </Checkbox>
  )
})

export default TagsCheckbox;
