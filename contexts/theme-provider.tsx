import { PropsWithChildren, useEffect, useState } from "react";
import { createContext } from "./create-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "@react-navigation/native";

type Theme = "light" | "dark";

type ThemeProviderState = {
  theme: Theme,
  toggleTheme: () => void,
}

const { ContextProvider, useContext } = createContext<ThemeProviderState>();

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const asyncStorageTheme = async () => {
      const savedTheme = (await AsyncStorage.getItem("theme")) as Theme | "light";
      if (savedTheme) {
        setTheme(savedTheme);
        AsyncStorage.setItem("theme", savedTheme);
      }
    }

    asyncStorageTheme();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    AsyncStorage.setItem("theme", newTheme);
  }

  return (
    <ContextProvider value={{ theme, toggleTheme }}>
      {children}
    </ContextProvider>
  )
}

export const useThemeContext = useContext;