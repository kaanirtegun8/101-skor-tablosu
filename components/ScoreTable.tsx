import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { theme } from "@/constants/Colors";

interface ScoreTableProps {
  playerList: string[];
  scores: { [key: string]: number[] };
  onPrizeOrPenaltyModalToggle: (playerName: string) => void;
}

const ScoreTable = ({ playerList, scores, onPrizeOrPenaltyModalToggle }: ScoreTableProps) => {
  const maxRounds = Math.max(
    ...Object.values(scores).map((scoreArray) => scoreArray.length)
  );

  const handlePrizeAndPenalty = (playerName: string) => {
    onPrizeOrPenaltyModalToggle(playerName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.roundHeader}></Text>
        {playerList.map((player, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.playerColumn, styles.headerButton]}
            onPress={() => handlePrizeAndPenalty(player)}
          >
            <Text style={styles.playerName}>{player}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scrollContainer}>
        {Array.from({ length: maxRounds }).map((_, roundIndex) => (
          <View key={roundIndex} style={styles.scoreRow}>
            <Text style={styles.roundText}>{`${roundIndex + 1}.El`}</Text>

            {playerList.map((player, playerIndex) => (
              <Text key={playerIndex} style={styles.scoreText}>
                {scores[player]?.[roundIndex] ?? "-"}
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: theme.colors.background,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerButton: {
    flex: 1,
  },
  playerColumn: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.onPrimary,
    textAlign: "center",
  },
  roundHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.onPrimary,
    textAlign: "left",
    flex: 0.5,
  },
  scrollContainer: {
    maxHeight: 300,
    borderWidth: 2,
    borderColor: theme.colors.tertiary,
    borderRadius: 8,
    padding: 5,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.tertiary,
  },
  roundText: {
    flex: 0.5,
    fontSize: 14,
    color: theme.colors.tertiary,
    textAlign: "left",
  },
  scoreText: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.secondary,
    textAlign: "center",
  },
});

export default ScoreTable;
