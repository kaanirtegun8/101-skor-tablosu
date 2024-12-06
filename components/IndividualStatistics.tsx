import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { usePlayers, Player } from "@/hooks/usePlayers";
import { theme } from "@/constants/Colors";
import PlayerStatisticsModal from "./PlayerStatisticsModal";
import { Button } from "react-native-paper";
import PlayerStatistics from "./PlayerStatistics";

const IndividualStatistics = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isPlayerStatisticsModalVisible, setPlayerStatisticsModalVisible] =
    useState(false);

  const { players } = usePlayers();

  useEffect(() => {
    if (players.length > 0 && !selectedPlayer) {
      setSelectedPlayer(players[0]);
    }
  }, [players]);

  const togglePlayerStatisticsModal = () => {
    setPlayerStatisticsModalVisible(!isPlayerStatisticsModalVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oyuncu Bazlı İstatistikler</Text>

      <View style={styles.selectionContainer}>
        <Button
          mode="contained-tonal"
          style={styles.button}
          onPress={togglePlayerStatisticsModal}
        >
          {selectedPlayer ? "Oyuncuyu Değiştir" : "Oyuncu Seç"}
        </Button>
        <Text style={{ color: "white" }}>:</Text>
        <Text style={styles.playerName}>
          {selectedPlayer?.name || "Oyuncu Seçilmedi"}
        </Text>
      </View>

      <View style={styles.statisticsContainer}>
        <PlayerStatistics player={selectedPlayer} />
      </View>

      <PlayerStatisticsModal
        visible={isPlayerStatisticsModalVisible}
        onClose={togglePlayerStatisticsModal}
        players={players}
        onPlayerSelect={setSelectedPlayer}
      />
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
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    borderRadius: 4,
    backgroundColor: "#f0d9f9",
  },
  playerName: {
    fontSize: 18,
    color: "white",
  },
  selectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  statisticsContainer: {
    flex: 1,
  }
});

export default IndividualStatistics;
