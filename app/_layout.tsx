import ErrorFallback from "@/components/error-fallback";
import Providers from "@/components/providers";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ErrorBoundary } from "react-error-boundary";

const RootLayout = () => {
  return (
    <Providers>
      <StatusBar style='auto' />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Stack>
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            <Stack.Screen name="create-lecture" options={{ headerShown: false, }} />
          </Stack>
        </ErrorBoundary >
    </Providers >
  )
}

export default RootLayout;
