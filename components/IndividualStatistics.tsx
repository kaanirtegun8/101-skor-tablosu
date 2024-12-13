import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { usePlayers, Player } from "@/hooks/usePlayers";
import { theme } from "@/constants/Colors";
import PlayerStatisticsModal from "./PlayerStatisticsModal";
import { Button } from "react-native-paper";
import PlayerStatistics from "./PlayerStatistics";
import useSelectedPlayer from "@/hooks/useSelectedPlayer";

const IndividualStatistics = () => {
  const { selectedPlayer, setSelectedPlayer } = useSelectedPlayer();
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
        {selectedPlayer ? (
          <Text style={styles.playerName}>{selectedPlayer?.name}</Text>
        ) : (
          <Text style={styles.noPlayer}>Oyuncu Seçilmedi</Text>
        )}
      </View>

      {selectedPlayer && (
        <View style={styles.statisticsContainer}>
          <PlayerStatistics player={selectedPlayer} />
        </View>
      )}

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
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  selectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 20,
  },
  statisticsContainer: {
    flex: 1,
  },
  noPlayer: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default IndividualStatistics;
