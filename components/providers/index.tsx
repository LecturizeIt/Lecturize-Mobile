import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { AuthProvider } from '@/contexts/auth-context';
import { Theme } from '@/types/theme';
import { CustomDarkTheme, CustomLightTheme } from '@/utilities/themeOptions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from '@react-navigation/native';
import {
  MutationCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { useColorScheme } from "nativewind";
import { PropsWithChildren, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000 // 2 minutes
    }
  },
  mutationCache: new MutationCache({
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  })
});

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
  }, [colorScheme, setColorScheme]);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "light" ? CustomLightTheme : CustomDarkTheme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <GluestackUIProvider mode={colorScheme}>
              {children}
            </GluestackUIProvider>
          </AuthProvider>
        </QueryClientProvider >
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default Providers;
