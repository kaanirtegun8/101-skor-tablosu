import { usePlayers } from "@/hooks/usePlayers";
import { filterOptions } from "@/hooks/useSaveGame";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Button, Text, Checkbox, Chip } from "react-native-paper"; // Chip bileşeni burada ekleniyor
import Autocomplete from "react-native-autocomplete-input";
import { theme } from "@/constants/Colors";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: filterOptions) => void;
}

export const FilterModal = ({
  onClose,
  visible,
  onApply,
}: FilterModalProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [playerCount, setPlayerCount] = useState<number | undefined>(undefined);
  const [query, setQuery] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [showPlayerDropdown, setShowPlayerDropdown] = useState(false);
  const { players } = usePlayers();

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleApply = () => {
    const filters: filterOptions = {
      playerCount,
      players: selectedPlayers,
    };
    onApply(filters);
    onClose();
  };

  const togglePlayerCount = (count: number) => {
    if (playerCount === count) {
      setPlayerCount(undefined);
    } else {
      setPlayerCount(count);
    }
  };

  const resetFilter = () => {
    setStartDate(undefined);
    setPlayerCount(undefined);
    setQuery("");
    setSelectedPlayers([]);
  };

  const togglePlayerSelection = (playerName: string) => {
    setSelectedPlayers((prevSelected) =>
      prevSelected.includes(playerName)
        ? prevSelected.filter((name) => name !== playerName)
        : [...prevSelected, playerName]
    );

    setQuery("");
  };

  const ToggleDropdownPlayers = (isShow: boolean) => {
    setShowPlayerDropdown(isShow);
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.content}>
        <Text style={styles.title}>Filtreleme Seçenekleri</Text>

        <View style={styles.playerCount}>
          <Text style={styles.playerCountText}>Oyuncu Sayısı: </Text>

          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxItem}>
              <Checkbox.Android
                status={playerCount === 3 ? "checked" : "unchecked"}
                onPress={() => togglePlayerCount(3)}
              />
              <Text>3</Text>
            </View>
            <View style={styles.checkboxItem}>
              <Checkbox.Android
                status={playerCount === 4 ? "checked" : "unchecked"}
                onPress={() => togglePlayerCount(4)}
              />
              <Text>4</Text>
            </View>
          </View>
        </View>

        <Autocomplete
          data={query ? filteredPlayers : []}
          defaultValue={query}
          onChangeText={(text) => setQuery(text)}
          placeholder="Oyuncu Ara..."
          placeholderTextColor={theme.colors.text}
          onFocus={() => ToggleDropdownPlayers(true)}
          onBlur={() => ToggleDropdownPlayers(false)}
          flatListProps={{
            keyboardShouldPersistTaps: "always",
            renderItem: ({ item }) => (
              <View style={styles.suggestionItem}>
                <Text onPress={() => togglePlayerSelection(item.name)}>
                  {item.name}
                  {selectedPlayers.includes(item.name) ? " ✔️" : ""}
                </Text>
              </View>
            ),
            keyExtractor: (item) => item.name,
          }}
          style={styles.autocompleteInput}
        />

        {selectedPlayers.length > 0 && (
          <View style={styles.selectedPlayers}>
            <Text style={styles.selectedPlayersText}>Seçilen Oyuncular</Text>
            <View style={styles.selectedPlayersContainer}>
              {selectedPlayers.map((name) => (
                <Chip
                  key={name}
                  mode="outlined"
                  onClose={() => togglePlayerSelection(name)}
                  style={styles.chip}
                >
                  {name}
                
                </Chip>
              ))}
            </View>
          </View>
        )}

        <View style={styles.buttons}>
          <Button
            mode="contained-tonal"
            textColor="white"
            onPress={handleApply}
            style={styles.filterButton}
          >
            Filtrele
          </Button>

          <Button
            mode="text"
            textColor="black"
            onPress={resetFilter}
            style={styles.resetFilter}
          >
            Sıfırla
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "white",
    paddingTop: 32,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  playerCount: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 12,
  },
  playerCountText: {
    fontSize: 14,
    fontWeight: "600",
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedPlayersContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  autocompleteInput: {
    width: "100%",
  },
  suggestionItem: {
    padding: 10,
    width: "100%",
    borderWidth: 0,
  },
  selectedPlayers: {
    marginVertical: 12,
    display: "flex",
    flexDirection: "column",
  },
  selectedPlayersText: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  chip: {
    margin: 4,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterButton: {
    marginVertical: 16,
    borderRadius: 4,
    backgroundColor: theme.colors.secondary,
    width: 100,
  },
  resetFilter: {
    marginVertical: 16,
    borderRadius: 4,
    width: 100,
  },
});