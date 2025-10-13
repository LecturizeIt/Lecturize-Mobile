import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import clsx from "clsx";
import { Tag } from "lucide-react-native";
import { useMemo } from "react";

const badgeActions = ["warning", "success", "info", "accent"] as const;

const getRandomAction = () => {
  const randint = Math.floor(Math.random() * 4);
  return badgeActions[randint];
};

type TagBadgeProps = {
  name: string;
  withIcon?: boolean;
  className?: string;
}

const TagBadge = ({ name, className, withIcon = true }: TagBadgeProps) => {
  const action = useMemo(getRandomAction, [name]);
  return (
    <>
      <Badge size="sm" variant="outline" action={action} className={clsx("items-center justify-center", className)}>
        <BadgeText className="capitalize text-center">{name}</BadgeText>
        {withIcon ? (
          <BadgeIcon as={Tag} className="ml-2" />
        ) : null}
      </Badge>
    </>
  )
}

export default TagBadge;
