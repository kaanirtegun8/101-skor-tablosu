import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { theme } from "@/constants/Colors";

interface TotalScoreModalProps {
  visible: boolean;
  onClose: () => void;
  totalScore: { [key: string]: number };
}

export const TotalScoreModal = ({
  onClose,
  totalScore,
  visible,
}: TotalScoreModalProps) => {
  return (
    <Modal isVisible={visible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.content}>
        <Text style={styles.title}>Toplam Skorlar</Text>
        <View style={styles.scoreList}>
          {Object.entries(totalScore).map(([player, score]) => (
            <View key={player} style={styles.scoreItem}>
              <Text style={styles.playerName}>{player}</Text>
              <Text style={styles.playerScore}>{score}</Text>
            </View>
          ))}
        </View>
        <View style={styles.divider} />
        <Text style={styles.closeButton} onPress={onClose}>
          Kapat
        </Text>
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
    padding: 25,
    borderRadius: 16,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 20,
  },
  scoreList: {
    width: "100%",
  },
  scoreItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.secondary,
    borderRadius: 10,
    marginBottom: 10,
  },
  playerName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  playerScore: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#ddd",
    marginVertical: 20,
  },
  closeButton: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: "600",
  },
});
