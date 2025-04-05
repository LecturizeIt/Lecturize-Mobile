import { fonts } from "@react-navigation/native/src/theming/fonts";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

export const CustomLightTheme: typeof DefaultTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: "#e9ebf7",
    card: "#f9f8fe"
  },
  fonts,
};

export const CustomDarkTheme: typeof DefaultTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    background: "#10131a",
    card: "#191b27"
  },
  fonts
}

const ACCENT_PURPLE = "#962dff";

export const tabStyle: BottomTabNavigationOptions = {
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
  }
}