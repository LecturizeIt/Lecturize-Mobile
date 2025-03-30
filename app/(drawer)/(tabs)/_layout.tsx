import TabIcon from "@/components/tab-icon";
import { Tabs, useRouter } from 'expo-router';
import { BookOpenText, PlusCircle, User } from "lucide-react-native";

const ACCENT_PURPLE = "#962dff";

const TabsLayout = () => {
  const router = useRouter()
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: ACCENT_PURPLE,
        headerShown: false,
        tabBarStyle: {
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          overflow: "hidden",
          borderWidth: 1,

        },
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignContent: "center",
        },
      }}>

      <Tabs.Screen
        name='index'
        options={{
          title: "Lectures",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} icon={BookOpenText} focused={focused} title="Lectures" />,
        }}
      />
      <Tabs.Screen
        name='create-lecture-placeholder'
        options={{
          title: "Create Lecture",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} icon={PlusCircle} focused={focused} />,
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            router.push("/create-lecture");
          }
        })}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} icon={User} focused={focused} title="Profile" />,
        }}
      />
      <Tabs.Screen
        name='lecture'
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} icon={User} focused={focused} title="Profile" />,
          href: null
        }}
      />
    </Tabs>
  );
}

export default TabsLayout;