import clsx from "clsx";
import { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { Box } from "../ui/box";
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";

type StickyHeaderProps = {
  activeTab: "lectures" | "participating-lectures";
  setActiveTab: React.Dispatch<React.SetStateAction<"lectures" | "participating-lectures">>;
};

const TABS = [
  { key: "lectures", title: "Suas palestras", description: "Palestras criadas por você" },
  { key: "participating-lectures", title: "Participando", description: "Palestras que você está participando no momemento" }
] as const;


const StickyHeader = ({ activeTab, setActiveTab }: StickyHeaderProps) => {

  const currentDescription = useMemo(() => TABS.reduce((acc, curr) => {
    return curr.key === activeTab ? curr.description : acc;
  }, ""), [activeTab]);

  return (
    <Box className=" bg-background-card" style={{ marginBottom: 10 }}>
      <HStack className='p-2 rounded-lg'>
        {TABS.map(({ key, title }, index) => (
          <TouchableOpacity
          className={clsx('flex-1 justify-center items-center rounded-lg py-1 px-4', { "bg-background-theme": activeTab === key })}
            key={key + "_" + index}
            onPress={() => setActiveTab(key)}
          >
            <Text size='lg' className={clsx('text-typography-400', { 'text-typography-900': activeTab === key })}>{title}</Text>
          </TouchableOpacity>
        ))}
      </HStack>
      <Text className="text-sm text-typography-500 text-center mb-2">{currentDescription}</Text>
    </Box>
  )
}

export default StickyHeader;
