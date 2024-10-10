import { Stack } from "expo-router";

type RootStackParamList = {
  index: undefined; 
  GameScreen: { players: string[]; gameMode: 'single' | 'team' };
};


export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="GameScreen"/>
      <Stack.Screen name="AllGames"/>
      <Stack.Screen name="Statistics"/>
    </Stack>
  );
}
