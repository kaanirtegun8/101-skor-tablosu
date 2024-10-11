import OldGameSummary from "@/components/OldGameSummary";
import { theme } from "@/constants/Colors";
import { Game, useSaveGame } from "@/hooks/useSaveGame";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FAB, Text } from "react-native-paper";
import { filterOptions } from "@/hooks/useSaveGame";
import { FilterModal } from "@/components/FilterModal";
import { useStatistic } from "@/hooks/useStatistic";

const AllGames = () => {
  const [allGames, setAllGames] = useState<Game[]>([]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [filterOptions, setFilterOptions] = useState<filterOptions | undefined>(undefined);

  const {games} = useStatistic(filterOptions);

  useEffect(() => {
    setAllGames(games);
  }, [games]);

  const toggleFilterModal = () => {
    setModalVisible(!isModalVisible);
  };

  const applyFilter = (filters: filterOptions) => {
    setFilterOptions(filters);
    toggleFilterModal();
  };

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

      <FilterModal visible={isModalVisible} onClose={toggleFilterModal} onApply={applyFilter} />

      <FAB
        icon="filter"
        size="medium"
        style={styles.fab}
        onPress={toggleFilterModal}
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
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: theme.colors.tertiary,
  },
});

export default AllGames;
