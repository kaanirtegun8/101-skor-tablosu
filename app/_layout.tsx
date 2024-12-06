import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Ana Sayfa" }} />
      <Stack.Screen name="GameScreen" options={{ title: "Oyun Ekranı" }} />
      <Stack.Screen name="AllGames" options={{ title: "Geçmiş Oyunlar" }} />
      <Stack.Screen name="Statistics" options={{ title: "İstatistikler" }} />
      <Stack.Screen name="Settings" options={{ title: "Ayarlar" }} />
      <Stack.Screen name="GameRules" options={{ title: "Oyun Kuralları" }} />
    </Stack>
  );
}
