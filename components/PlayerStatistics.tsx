import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { Game, useSaveGame } from "@/hooks/useSaveGame";
import { Player } from "@/hooks/usePlayers";
import { useAlert } from "@/hooks/useAlert";
import CommonBoxGraphs from "./CommonBoxGraphs";
import useStandardDeviation from "@/hooks/useCalculateStandartDeviation";
import { theme } from "@/constants/Colors";
import OldGameSummary from "./OldGameSummary";

interface PlayerStatisticsProps {
  player: Player | null;
}

const PlayerStatistics = ({ player }: PlayerStatisticsProps) => {
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const { loadAllGames } = useSaveGame();

  const averageScore = filteredGames.map((game: Game, index) => {
    const gameRound = game.scores[player?.name || ""] || [];

    return {
      x: index + 1,
      y:
        gameRound.length > 0
          ? Math.round(gameRound.reduce((a, b) => a + b, 0) / gameRound.length)
          : 0,
    };
  });

  const standartDeviationData = filteredGames.map((game: Game, index) => {
    const gameRound = game.scores[player?.name || ""] || [];

    if (gameRound.length < 2) return 0;

    return Math.round(gameRound.reduce((a, b) => a + b, 0) / gameRound.length);
  });

  const averageScoreStandardDeviation = useStandardDeviation(
    standartDeviationData
  );

  const winningGameCount = filteredGames.filter((game: Game, index) => {
    const minScore = Math.min(...Object.values(game.totalScores));

    return game.totalScores[player?.name || ""] === minScore;
  });

  const winningGameRate = (
    (winningGameCount.length / filteredGames.length) *
    100
  ).toFixed(2);

  const averagePrize = filteredGames.map((game: Game, index) => ({
    x: index + 1,
    y: game.prizes[player?.name || ""]?.reduce((a, b) => a + b) || 0,
  }));

  const averagePenalty = filteredGames.map((game: Game, index) => ({
    x: index + 1,
    y: -game.penalties[player?.name || ""]?.reduce((a, b) => a + b) || 0,
  }));

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

  if (filteredGames.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>
          Bu oyuncu için kayıtlı bir oyun bulunamadı.
        </Text>
      </View>
    );
  }

  const findBestGame = (games: Game[], playerName: string): Game | null => {
    let bestGame: Game | null = null;
    let maxScoreDifference = -Infinity;

    for (const game of games) {
      if (!game.totalScores[playerName]) continue;

      const playerScore = game.totalScores[playerName];

      if (Math.min(...Object.values(game.totalScores)) !== playerScore)
        continue;

      let totalDifference = 0;

      for (const player of game.playerList) {
        if (player !== playerName) {
          const otherPlayerScore = game.totalScores[player];
          totalDifference += otherPlayerScore - playerScore;
        }
      }

      const averageDifference = totalDifference / (game.playerList.length - 1);

      if (averageDifference > maxScoreDifference) {
        maxScoreDifference = averageDifference;
        bestGame = game;
      }
    }

    return bestGame;
  };

  const bestGame = findBestGame(filteredGames, player.name);

  const PerformanceScoreBox = ({
    score,
    title,
  }: {
    score: number;
    title: string;
  }) => (
    <View style={styles.shadowContainer}>
      <Text style={styles.shadowText}>{title}</Text>
      <Text style={styles.highlightText}>%{score}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      <PerformanceScoreBox
        score={100 - Number(averageScoreStandardDeviation)}
        title="Performans Tutarlılık Oranı"
      />
      <PerformanceScoreBox
        score={Number(winningGameRate)}
        title="Oyun Kazanma Oranı"
      />

      <CommonBoxGraphs data={scoreData} title="Oyun Skorları" />
      <CommonBoxGraphs data={averageScore} title="Ortalama Tur Puanı" />
      <CommonBoxGraphs data={averagePrize} title="Ödül Puanları" />
      <CommonBoxGraphs data={averagePenalty} title="Ceza Puanları" />

      <View style={styles.bestGameWrapper}>
        <Text style={styles.bestGameTitle}>Oyuncunun En iyi Maçı</Text>

        {bestGame ? (
          <OldGameSummary game={bestGame} />
        ) : (
          <Text style={styles.noDataText}>Oyuncunun henüz galibiyeti yoktur 😔 </Text>
        )}
      </View>
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
    justifyContent: "center",
    alignItems: "center",
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
  noDataText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  shadowContainer: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginVertical: 16,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  shadowText: {
    fontSize: 18,
    color: "#a78bfa",
    fontWeight: "bold",
    textAlign: "center",
  },
  highlightText: {
    fontSize: 24,
    color: theme.colors.accent,
    fontWeight: "bold",
  },
  bestGameWrapper: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginVertical: 16,
    alignItems: "center",
  },
  bestGameTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  }
});

export default PlayerStatistics;
