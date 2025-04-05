import ErrorFallback from "@/components/error-fallback";
import Providers from "@/components/providers";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ErrorBoundary } from "react-error-boundary";
import { SafeAreaView } from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <Providers>
      <SafeAreaView className="flex-1 bg-background-theme">
        <StatusBar style='auto' />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Stack>
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            <Stack.Screen name="create-lecture" options={{ headerShown: false, }} />
          </Stack>
        </ErrorBoundary >
      </SafeAreaView>
    </Providers >
  )
}

export default RootLayout;
