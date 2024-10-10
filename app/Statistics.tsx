import React from "react";
import { useStatistic } from "@/hooks/useStatistic";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "@/constants/Colors";
import StatisticPanel from "@/components/StatisticPanel";

const Statistics = () => {
  const {
    calculateAverageScoresByMatch,
    calculateAverageScoresPerRound,
    calculateAveragePenaltiesByGame,
    calculateAverageRewardsByGame,
    calculateConsecutive200s,
    calculateConsecutiveNegatives
  } = useStatistic();

  const statisticsData = [
    {
      id: '1',
      data: calculateAverageScoresByMatch,
      title: "Oyun Başına Ortalama Puan",
    },
    {
      id: '2',
      data: calculateAverageScoresPerRound,
      title: "Tur Başına Ortalama Puan",
    },
    {
      id: '3',
      data: calculateAveragePenaltiesByGame,
      title: "Oyun Başına Ortalama Cezalar",
    },
    {
      id: '4',
      data: calculateAverageRewardsByGame,
      title: "Oyun Başına Ortalama Ödüller",
    },
    {
      id: '5',
      data: calculateConsecutive200s,
      title: "Üst üste açamama (el sayısı)",
    }, 
    {
      id: '6',
      data: calculateConsecutiveNegatives,
      title: "Üst üste bitme (el sayısı)",
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>İstatistikler</Text>

      <FlatList
        data={statisticsData}
        renderItem={({ item }) => (
          <StatisticPanel data={item.data} title={item.title} />
        )}
        keyExtractor={(item) => item.id}
      />

      {calculateAverageScoresByMatch.length === 0 && (
        <Text style={styles.noDataText}>No statistics available</Text>
      )}
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
    marginBottom: 20,
    textAlign: "center",
  },
  noDataText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});

export default Statistics;
