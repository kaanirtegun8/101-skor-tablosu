import useRewardSystem from "@/hooks/useRewardSystem";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface PenaltyTableProps {
  playerList: string[];
  penalties: { [key: string]: number[] };
  prizes: { [key: string]: number[] };
}

const PenaltyTable = ({ playerList, penalties, prizes }: PenaltyTableProps) => {
  const { isRewardSystemEnabled } = useRewardSystem();
  let penaltyText = "Ödül ve Cezalar";
  if (!isRewardSystemEnabled) {
    penaltyText = "Cezalar";
  }

  return (
    <View style={styles.penaltyContainer}>
      <Text style={styles.penaltyTitle}>{penaltyText}</Text>
      <View style={styles.tableContainer}>
        {playerList.map((player, index) => (
          <View key={index} style={styles.playerContainer}>
            <Text style={styles.playerName}>{player}</Text>
            <Text style={styles.penaltyText}>
              {penalties[player]?.map((penalty) => penalty * -1).join(", ") ||
                "Ceza yok"}
            </Text>
            {isRewardSystemEnabled && (
              <View style={styles.prizeContainer}>
                {prizes[player]?.flatMap((prize, prizeIndex) => (
                  <View key={prizeIndex} style={styles.starContainer}>
                    {Array.from({ length: Math.floor(prize / 100) }).map(
                      (_, starIndex) => (
                        <Icon
                          name="star"
                          size={16}
                          color="#FFD700"
                          key={starIndex}
                        />
                      )
                    )}
                  </View>
                )) || <Text>Yıldız Yok</Text>}
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  penaltyContainer: {
    padding: 16,
    backgroundColor: "#d4a373",
    borderRadius: 8,
  },
  penaltyTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
    textAlign: "center",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  playerContainer: {
    width: "48%",
    marginBottom: 12,
  },
  playerName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  penaltyText: {
    fontSize: 14,
    marginBottom: 2,
  },
  prizeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  prizeText: {
    fontSize: 14,
    marginRight: 4,
  },
  starContainer: {
    flexDirection: "row",
  },
});

export default PenaltyTable;
