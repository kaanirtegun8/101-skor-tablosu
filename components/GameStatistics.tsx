import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FAB, Text } from "react-native-paper";
import StatisticPanel from "@/components/StatisticPanel";
import { FilterModal } from "@/components/FilterModal";
import { useStatistic } from "@/hooks/useStatistic";
import { filterOptions } from "@/hooks/useSaveGame";
import { theme } from "@/constants/Colors";

const GameStatistics = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [filterOptions, setFilterOptions] = useState<filterOptions | undefined>(
    undefined
  );
  const {
    calculateAverageScoresByMatch,
    calculateAverageScoresPerRound,
    calculateAveragePenaltiesByGame,
    calculateAverageRewardsByGame,
    calculateConsecutive200s,
    calculateConsecutiveNegatives,
    calculateAverageRankingByGame,
    maxScores,
    minScores,
    playerRatings,
  } = useStatistic(filterOptions);

  const statisticsData = [
    {
      id: "1",
      data: calculateAverageScoresByMatch,
      title: "Oyun Başına Ortalama Puan",
    },
    {
      id: "2",
      data: calculateAverageScoresPerRound,
      title: "Tur Başına Ortalama Puan",
    },
    {
      id: "3",
      data: calculateAverageRankingByGame,
      title: "Oyun Başına Ortalama Sıralama",
    },
    {
      id: "4",
      data: calculateAveragePenaltiesByGame,
      title: "Oyun Başına Ortalama Cezalar",
    },
    {
      id: "5",
      data: calculateAverageRewardsByGame,
      title: "Oyun Başına Ortalama Ödüller",
    },
    {
      id: "6",
      data: calculateConsecutive200s,
      title: "Üst üste açamama (el sayısı)",
    },
    {
      id: "7",
      data: calculateConsecutiveNegatives,
      title: "Üst üste bitme (el sayısı)",
    },
    {
      id: "8",
      data: maxScores,
      title: "Bir turda Alınan en yüksek puan",
    },
    {
      id: "9",
      data: minScores,
      title: "Bir turda alınan en düşük puan",
    },
    {
      id: "10",
      data: playerRatings,
      title: "AI performans değerlendirmeleri (10 üzerinden)",
    },
  ];

  const applyFilter = (filters: filterOptions) => {
    setFilterOptions(filters);
    toggleFilterModal();
  };

  const toggleFilterModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Oyun Bazlı İstatistikler</Text>

        <FAB
          icon="filter"
          size="small"
          style={styles.fab}
          onPress={toggleFilterModal}
        />
      </View>

      {calculateAverageScoresByMatch.length === 0 ? (
        <Text style={styles.noDataText}>No statistics available</Text>
      ) : (
        <FlatList
          style={{marginBottom: 80}}
          data={statisticsData}
          renderItem={({ item }) => (
            <StatisticPanel data={item.data} title={item.title} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}

      <FilterModal
        visible={isModalVisible}
        onClose={toggleFilterModal}
        onApply={applyFilter}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  noDataText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  fab: {
    backgroundColor: "#FFA500",
    alignSelf: "flex-end",
  },
});

export default GameStatistics;
