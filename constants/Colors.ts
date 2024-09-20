import { MD3LightTheme } from "react-native-paper";

export const theme = {
  ...MD3LightTheme,
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#007f5f",
    secondary: "#d4a373",
    tertiary: "#81b29a",
    background: "#004b23", 
    onPrimary: "#ffffff",
  },
};

export const Colors = {
  light: {
    icon: '#000',
    background: '#fff',
  },
  dark: {
    icon: '#fff',
    background: '#000',
  },
};
