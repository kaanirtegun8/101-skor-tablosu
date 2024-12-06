import { theme } from "@/constants/Colors";
import { Player } from "@/hooks/usePlayers";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Button, Divider, Text } from "react-native-paper";

interface PlayerStatisticsModalProps {
  visible: boolean;
  onClose: () => void;
  players: Player[];
  onPlayerSelect: (player: Player) => void;
}

const PlayerStatisticsModal = ({
  visible,
  onClose,
  players,
  onPlayerSelect,
}: PlayerStatisticsModalProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handleSaveSelectedPlayer = () => {
    if (selectedPlayer) {
      onPlayerSelect(selectedPlayer);
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedPlayer(null);
    onClose();
  };

  return (
    <Modal isVisible={visible} style={styles.modal} propagateSwipe>
      <View style={styles.content}>
        <Text style={styles.title}>Oyuncu Seç</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedPlayer ? String(selectedPlayer.id) : ""}
            itemStyle={styles.itemStyle}
            onValueChange={(itemValue: string) => {
              const player = players.find((p) => String(p.id) === itemValue);
              setSelectedPlayer(player || null);
            }}
            style={styles.picker}
            mode="dropdown"
          >
            {players.map((player) => (
              <Picker.Item
                key={player.id}
                label={player.name}
                value={String(player.id)}
              />
            ))}
          </Picker>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.actionButtonsContainer}>
          <Button
            style={[styles.button, styles.closeButton]}
            mode="contained"
            onPress={handleClose}
          >
            Close
          </Button>
          <Button
            style={[styles.button, styles.saveButton]}
            mode="contained"
            onPress={handleSaveSelectedPlayer}
          >
            Kaydet
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  content: {
    backgroundColor: "white",
    padding: 28,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  divider: {
    marginVertical: 10,
    width: 1,
    backgroundColor: "black",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 15,
    backgroundColor: "#FAFAFA",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  picker: {
    width: "100%",
    height: 200,
  },
  itemStyle: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  button: {
    flex: 1,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  closeButton: {
    backgroundColor: theme.colors.secondary,
  },
  saveButton: {
    backgroundColor: theme.colors.tertiary,
  },
});

export default PlayerStatisticsModal;
