import { MD3LightTheme } from "react-native-paper";
import { red900, redA200 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

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
    red900: '#b71c1c',
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
