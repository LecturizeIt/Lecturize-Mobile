import Providers from '@/components/providers';
import "@/global.css";
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function RootLayout() {
  return (
    <Providers>
      <GestureHandlerRootView className='flex-1'>
        <StatusBar style='auto'/>
        <Drawer screenOptions={{drawerStyle: {maxWidth: "70%"}}}>
          <Drawer.Screen
            name="(tabs)"
            options={{
              drawerLabel: 'Home',
              title: 'Home',
            }}
          />
          <Drawer.Screen
            name="settings"
            options={{
              drawerLabel: 'Settings',
              title: 'Settings',
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </Providers>
  );
}
