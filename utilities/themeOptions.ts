import { fonts } from "@react-navigation/native/src/theming/fonts";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const CustomLightTheme: typeof DefaultTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: "rgb(242, 242, 242)",
    // border: "#000",
  },
  fonts,
};

export const CustomDarkTheme: typeof DefaultTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    background: "#212121"
  },
  fonts
}