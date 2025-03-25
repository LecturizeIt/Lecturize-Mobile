import CustomHeader from '@/components/custom-header';
import Providers from '@/components/providers';
import { Icon } from '@/components/ui/icon';
import "@/global.css";
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from "expo-status-bar";
import { BookOpenText, KeyRound, Settings } from 'lucide-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <Providers>
      <GestureHandlerRootView className='flex-1'>
        <StatusBar style='auto' />
        <Drawer screenOptions={{
          drawerStyle: { maxWidth: "70%" },
          swipeEnabled: false,
          header: (props) => <CustomHeader {...props} />,

        }}>
          <Drawer.Screen
            name="(tabs)"
            options={{
              drawerLabel: 'Home',
              title: "Lectures",
              drawerIcon: ({ color }) => <Icon as={BookOpenText} color={color} />
            }}
          />
          <Drawer.Screen
            name="(auth)"
            options={{
              drawerLabel: 'Autenticação',
              title: 'Autenticação',
              drawerIcon: ({ color }) => <Icon as={KeyRound} color={color} />,
            }}
          />
          <Drawer.Screen
            name="settings"
            options={{
              drawerLabel: 'Settings',
              title: 'Settings',
              drawerIcon: ({ color }) => <Icon as={Settings} color={color} />
            }}
          />

        </Drawer>
      </GestureHandlerRootView>
    </Providers>
  );
}
