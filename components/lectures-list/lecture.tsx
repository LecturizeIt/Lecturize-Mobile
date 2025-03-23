import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import useImage from "@/hooks/use-image";
import { Lecture as LectureType } from "@/types/lecture";
import { useState } from "react";
import { Image } from "react-native";
import Logo from "@/assets/images/logo.png";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const Lecture = ({ lecture }: { lecture: LectureType }) => {
  const [hasImage, setHasImage] = useState(true);
  const { image } = useImage(`${BASE_URL}/lectures/${lecture.id}/image`);

  return (
    <>
      <Card size="md" variant="outline" className="m-3" key={lecture.id}>
        <Heading size="md" className="mb-1">
          {lecture.title}
        </Heading>

        {hasImage ? (
          <Image
            source={{ uri: image }}
            className="w-full h-[200px]"
            resizeMode="contain"
            onError={() => setHasImage(false)}
          />
        ) : (
          <Image
            source={Logo}
            className="w-full h-[200px]"
            resizeMode="contain"
          />
        )}
        <Text size="sm">{lecture.description}</Text>
      </Card>
    </>
  )
}

export default Lecture;
