import { useTheme } from 'react-native-paper';

interface ThemeProps {
  light?: string;
  dark?: string;
}

// MD3Colors type definition from react-native-paper
type ThemeColors = {
  primary: string;
  primaryContainer: string;
  secondary: string;
  secondaryContainer: string;
  tertiary: string;
  tertiaryContainer: string;
  surface: string;
  surfaceVariant: string;
  background: string;
  error: string;
  errorContainer: string;
  onPrimary: string;
  onPrimaryContainer: string;
  onSecondary: string;
  onSecondaryContainer: string;
  onTertiary: string;
  onTertiaryContainer: string;
  onSurface: string;
  onSurfaceVariant: string;
  onError: string;
  onErrorContainer: string;
  outline: string;
  outlineVariant: string;
  inverseOnSurface: string;
  inverseSurface: string;
  inversePrimary: string;
  shadow: string;
  surfaceTint: string;
  scrim: string;
  text: string;
};

export const useThemeColor = (
  props: ThemeProps,
  colorName: keyof ThemeColors
): string => {
  const theme = useTheme();
  const colorFromProps = props.light || props.dark;

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return theme.colors[colorName as keyof typeof theme.colors] as string;
  }
};
