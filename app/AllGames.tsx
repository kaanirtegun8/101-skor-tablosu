import OldGameSummary from "@/components/OldGameSummary";
import { theme } from "@/constants/Colors";
import { Game } from "@/hooks/useSaveGame";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const AllGames = () => {
  const [allGames, setAllGames] = useState<Game[]>([]);

  const { games } = useLocalSearchParams();

  useEffect(() => {
    if (games) {
      const parsedGames = JSON.parse(games as string) as Game[];
      setAllGames(parsedGames);
    }
  }, [games]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıtlı Oyunlar</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {allGames.length > 0 ? (
          allGames.map((game, index) => {
            return (
              <View key={index} style={styles.cardWrapper}>
                <OldGameSummary game={game} />
              </View>
            );
          })
        ) : (
          <Text>No games played yet</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollView: {
    flexGrow: 1,
    width: "100%",  
  },
  cardWrapper: {
    flex: 1,
    width: "100%",  
    justifyContent: "center",
  },
});

export default AllGames;
