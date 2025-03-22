import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import "@/global.css";
import { Theme } from '@/types/theme';
import { MyLightTheme } from '@/utilities/themeOptions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from "nativewind";
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    const setThemeFromStorage = async () => {
      const storageTheme = (await AsyncStorage.getItem("theme") as Theme ?? "light");
      setColorScheme(storageTheme);
    }

    setThemeFromStorage();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "light" ? MyLightTheme : DarkTheme}>
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider mode={colorScheme}>
          <GestureHandlerRootView className='flex-1'>
            <Drawer>
              <Drawer.Screen
                name="(tabs)"
                options={{
                  drawerLabel: 'Main',
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
        </GluestackUIProvider>
      </QueryClientProvider >
    </ThemeProvider>
  );
}
