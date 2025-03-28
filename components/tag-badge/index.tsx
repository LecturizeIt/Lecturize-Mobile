import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { Tag } from "lucide-react-native";
import { useMemo } from "react";

const badgeActions = ["warning", "success", "info", "accent"] as const;

const getRandomAction = () => {
  const randint = Math.floor(Math.random() * 4);
  return badgeActions[randint];
}

const TagBadge = ({ name }: { name: string }) => {
  const action = useMemo(getRandomAction, [name]);
  return (
    <>
      <Badge size="sm" variant="outline" action={action}>
        <BadgeText className="capitalize">{name}</BadgeText>
        <BadgeIcon as={Tag} className="ml-2" />
      </Badge>
    </>
  )
}

export default TagBadge;
