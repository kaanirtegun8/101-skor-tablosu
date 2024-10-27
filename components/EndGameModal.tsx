import { theme } from "@/constants/Colors";
import useCalculateGameDuration from "@/hooks/useCalculateGameDuration";
import { Game } from "@/hooks/useSaveGame";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Divider } from "react-native-paper";

interface EndGameModalProps {
  visible: boolean;
  onClose: () => void;
  game: Game;
  finishGame: () => void;
}

const EndGameModal = ({
  game,
  visible,
  onClose,
  finishGame,
}: EndGameModalProps) => {

  return (
    <Modal isVisible={visible} style={styles.modal}>
      <View style={styles.content}>

       <Text style={styles.descriptionText}>
          Oyunu bitirmek istediğinize emin misiniz?
       </Text>
       <Text style={styles.descriptionHintText}>
          ( Bu işlem geri alınamaz )
       </Text>

       <Text style={styles.gameDuration}>
          Oyun süresi: {useCalculateGameDuration({ startTime: game.startTime, endTime: game.endTime })}
       </Text>

       <Divider style={styles.divider} />


        <View style={styles.actionButtonsRow}>
          <TouchableOpacity
            onPress={finishGame}
            style={[styles.buttons, { backgroundColor: "#f44336" }]}
          >
            <Text style={styles.buttonText}>Oyunu Bitir</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            style={[styles.buttons, { backgroundColor: theme.colors.backdrop }]}
          >
            <Text style={styles.buttonText}>İptal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
  },
  content: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderRadius: 16,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttons: {
    width: "48%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  descriptionText: {
    fontSize: 16,
    color: "#333",
    paddingHorizontal: 12,
    textAlign: "center",
  },
  descriptionHintText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
    marginBottom: 20,
  },
  gameDuration: {
    fontSize: 12,
    color: "#333",
    marginTop: 20,
  },
});

export default EndGameModal;
