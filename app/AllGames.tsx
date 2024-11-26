import OldGameSummary from "@/components/OldGameSummary";
import { theme } from "@/constants/Colors";
import { Game } from "@/hooks/useSaveGame";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FAB, Text } from "react-native-paper";
import { filterOptions } from "@/hooks/useSaveGame";
import { FilterModal } from "@/components/FilterModal";
import { useStatistic } from "@/hooks/useStatistic";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const AllGames = () => {
  const [allGames, setAllGames] = useState<Game[]>([]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [filterOptions, setFilterOptions] = useState<filterOptions | undefined>(
    undefined
  );

  const { games } = useStatistic(filterOptions);

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
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Kayıtlı Oyunlar</Text>
            <FAB
              icon="filter"
              size="small"
              style={styles.fab}
              onPress={toggleFilterModal}
            />
          </View>
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
              <Text style={styles.noSavedGames}>Kayıtlı oyun bulunamadı</Text>
            )}
          </ScrollView>

          <FilterModal
            visible={isModalVisible}
            onClose={toggleFilterModal}
            onApply={applyFilter}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 2,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
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
    backgroundColor: theme.colors.tertiary,
  },
  noSavedGames: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  }
});

export default AllGames;
