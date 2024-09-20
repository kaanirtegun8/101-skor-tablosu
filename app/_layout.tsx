import { Stack } from "expo-router";
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  index: undefined; // index ekranına parametre gönderilmiyor
  GameScreen: { players: string[]; gameMode: 'single' | 'team' }; // GameScreen parametreleri
};


export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="GameScreen"/>
    </Stack>
  );
}
