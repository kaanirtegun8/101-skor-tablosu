import { theme } from '@/constants/Colors';
import { useTheme } from 'react-native-paper';

interface ThemeProps {
  light?: string;
  dark?: string;
}

export function useThemeColor(
  props: ThemeProps,
  colorName: keyof typeof theme.colors
) {
  const { colors } = useTheme();
  const colorFromProps = props[colors[colorName] ? 'light' : 'dark'];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return colors[colorName];
  }
}
