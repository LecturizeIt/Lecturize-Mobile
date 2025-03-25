import { Tags } from "@/types/lecture";
import { Text } from "../ui/text";
import { FlatList } from "react-native";
import { Box } from "../ui/box";

const LectureTags = ({ tags }: { tags: Tags }) => {

  if (!tags.length) {
    return <Text>Essa palestra não possui tags</Text>
  }

  return (
    <FlatList
      ListHeaderComponent={() => <Text>Tags:</Text>}
      scrollEnabled={false}
      data={tags}
      className="flex-grow-0"
      keyExtractor={(item) => item.id!.toString()}
      renderItem={({ item: tag }) => (
        <Box className="flex flex-col gap-1 ps-2">
          <Text>{`\u2022 ${tag.name}`}</Text>
        </Box>
      )}
    >

    </FlatList>
  )
}

export default LectureTags;
