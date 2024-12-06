import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { Game, useSaveGame } from "@/hooks/useSaveGame";
import { Player } from "@/hooks/usePlayers";
import { useAlert } from "@/hooks/useAlert";
import CommonBoxGraphs from "./CommonBoxGraphs";

interface PlayerStatisticsProps {
  player: Player | null;
}

const PlayerStatistics = ({ player }: PlayerStatisticsProps) => {
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const { loadAllGames } = useSaveGame();

  const averageScore = filteredGames.map((game: Game, index) => {
    const gameRound = game.scores[player?.name || ""];

    return {
      x: index + 1,
      y: Math.round(gameRound.reduce((a, b) => a + b, 0) / gameRound.length),
    }
  })

  const scoreData = filteredGames.map((game: Game, index) => ({
    x: index + 1,
    y: game.totalScores[player?.name || ""] || 0,
  }));

  useEffect(() => {
    if (!player) return;

    const fetchGames = async () => {
      setLoading(true);
      try {
        const allGames = await loadAllGames({ players: [player.name] });
        setFilteredGames(allGames);
      } catch (error) {
        showAlert("Oyun verileri yüklenirken bir sorun oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [player]);

  if (!player) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Oyuncu seçilmedi.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{paddingBottom: 30}}>
      <CommonBoxGraphs data={scoreData} title="Oyun Skoru" />
      <CommonBoxGraphs data={averageScore} title="Ortalama Tur Puanı" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    padding: 12,
    backgroundColor: "white",
    marginVertical: 16,
    borderRadius: 8,
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlayerStatistics;
