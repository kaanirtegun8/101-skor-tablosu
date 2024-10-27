import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import { theme } from "@/constants/Colors";

interface AddScoreModalProps {
  visible: boolean;
  rountCount: number;
  playerList: string[];
  onClose: () => void;
  onAddScore: (playerName: string, score: number) => void;
}

export const AddScoreModal = ({
  playerList,
  onClose,
  visible,
  onAddScore,
  rountCount,
}: AddScoreModalProps) => {
  const [scores, setScores] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);

  const handleScoreChange = (playerName: string, value: string, isDefault = false) => {
    setScores({ ...scores, [playerName]: isDefault ? (Number(scores[playerName]) > 0 ? String(Number(scores[playerName]) * 2) : value) : value });
  };

  const handleCompleteDirectly = (player: string) => {
    setScores({
      ...scores,
      [player]: (scores[player] && Number(scores[player]) <= 0) ? String(Number(scores[player]) * 2) : "-101",
    });
  };

  const handleSave = () => {
    const allFilled = playerList.every((player) => scores[player] && scores[player] !== "");
    if (!allFilled) {
      setError("Lütfen tüm oyuncular için skorları giriniz.");
      return;
    }

    Object.keys(scores).forEach((playerName) => {
      const score = parseInt(scores[playerName], 10);
      if (!isNaN(score)) {
        onAddScore(playerName, score);
      }
    });
    setScores({});
    setError(null);
    onClose();
  };

  const closeModal = () => {
    setScores({});
    setError(null);
    onClose();
  };

  const allScoresFilled = playerList.every((player) => scores[player] && scores[player] !== "");

  return (
    <Modal isVisible={visible} style={styles.modal}>
      <View style={styles.content}>
        <Text style={styles.modalTitle}> {rountCount}. El Skorlarını Gir</Text>

        {playerList.map((player, index) => (
          <View key={index} style={styles.inputRow}>
            <Text style={styles.playerName}>{player}:</Text>

            <TouchableOpacity
              style={styles.defaultButton}
              onPress={() => handleScoreChange(player, '202', true)}
            >
              <Text style={styles.buttonText}>
                202{" "}
                {Number(scores[player]) > 0
                  ? `x ${Math.round(Number(scores[player]) / 202)}`
                  : ``}{" "}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.completeButton}
              onPress={() => handleCompleteDirectly(player)}
            >
              <Text style={styles.buttonText}>
                Biter{" "}
                {Number(scores[player]) < 0
                  ? `x ${Math.round(Number(scores[player]) / -101)}`
                  : ``}{" "}
              </Text>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Skor"
              placeholderTextColor={theme.colors.text}
              value={scores[player] || ""}
              onChangeText={(value) => handleScoreChange(player, value)}
            />
          </View>
        ))}

        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={handleSave}
            style={[styles.saveButton, !allScoresFilled && styles.disabledButton]}
            disabled={!allScoresFilled}
          >
            <Text style={styles.buttonText}>Kaydet</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
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
    margin: 0,
    padding: 12,
  },
  content: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  playerName: {
    fontSize: 16,
    flex: 1,
    textAlign: "left",
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    textAlign: "left",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  completeButton: {
    backgroundColor: theme.colors.tertiary,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
    width: 50,
  },
  defaultButton: {
    backgroundColor: theme.colors.red900,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  cancelButton: {
    backgroundColor: theme.colors.secondary,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});