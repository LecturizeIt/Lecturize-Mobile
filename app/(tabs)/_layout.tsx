import { Icon } from '@/components/ui/icon';
import { Tabs } from 'expo-router';
import { Home, User } from "lucide-react-native";

const Layout = () => {
  const isLogged = true;
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#962dff", headerShown: false }}>
      <Tabs.Screen
        name='index'
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Icon as={Home} className='m-2 size-4' color={color} />,
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <Icon as={User} className='m-2 size-4' color={color} />,
          // href: null
        }}
      />
      <Tabs.Screen
        name='login'
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => <Icon as={User} className='m-2 size-4' color={color} />,
          // href: null
        }}
      />
      <Tabs.Screen
        name='register'
        options={{
          title: "Register",
          tabBarIcon: ({ color }) => <Icon as={User} className='m-2 size-4' color={color} />,
          href: null
        }}
      />

    </Tabs>
  );
}

export default Layout;