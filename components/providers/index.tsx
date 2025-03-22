import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { AuthProvider } from '@/contexts/auth-context';
import { Theme } from '@/types/theme';
import { MyLightTheme } from '@/utilities/themeOptions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { useColorScheme } from "nativewind";
import { PropsWithChildren, useEffect, useState } from 'react';

const queryClient = new QueryClient();

const Providers = ({ children }: PropsWithChildren) => {
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    const setThemeFromStorage = async () => {
      const storedTheme = await AsyncStorage.getItem("theme") as Theme;
      if (storedTheme) {
        setColorScheme(storedTheme);
        return;
      }
      setColorScheme('system');
    }

    setThemeFromStorage();
  }, [colorScheme]);

  return (
    <ThemeProvider value={colorScheme === "light" ? MyLightTheme : DarkTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <GluestackUIProvider mode={colorScheme}>
            {children}
          </GluestackUIProvider>
        </AuthProvider>
      </QueryClientProvider >
    </ThemeProvider>
  );
}

export default Providers;
