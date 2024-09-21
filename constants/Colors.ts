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
    redA200: '#ff5252',
    accent: "#f4a261", 
    highlight: "#f2e9e4", 
    text: "#264653", 
    success: "#2a9d8f", 
    warning: "#e9c46a", 
    error: "#e76f51", 
    lightGray: "#e0e0e0", 
    darkGray: "#333333", 
    darkGreen: "#003d1f", 
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
