import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import Modal from "react-native-modal";
  import { useState } from "react";
  import { theme } from "@/constants/Colors";
  
  interface AddPrizeAndPenaltyModalProps {
    visible: boolean;
    playerName: string;
    onClose: () => void;
    onAddPrizeOrPenalty: (playerName: string, score: number) => void;
  }
  
  export const AddPrizeAndPenaltyModal = ({
    onAddPrizeOrPenalty,
    onClose,
    playerName,
    visible,
  }: AddPrizeAndPenaltyModalProps) => {
    const [score, setScore] = useState<string>("");
  
    const handleCloseModal = () => {
      setScore("");
      onClose();
    };
  
    const handleAddScore = () => {
      // Convert the string to a number and negate it if it's positive
      const numericScore = Number(score) > 0 ? -Math.abs(Number(score)) : Number(score);
      if (!isNaN(numericScore)) {
        onAddPrizeOrPenalty(playerName, numericScore);
      }
      setScore("");
      onClose();
    };
  
    const handleAddStarScore = () => {
      onAddPrizeOrPenalty(playerName, 100);
      setScore("");
      onClose();
    };
  
    return (
      <Modal isVisible={visible} onBackdropPress={handleCloseModal}>
        <View style={styles.content}>
          <Text style={styles.modalTitle}>{playerName}</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Enter penalty points"
              keyboardType="numeric"
              value={score}
              onChangeText={setScore} 
            />
  
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#f44336" }]}
              onPress={() => setScore("100")}
            >
              <Text style={styles.buttonText}>100</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.starButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleAddStarScore}
          >
            <Text style={styles.buttonText}>⭐ Ekle</Text>
          </TouchableOpacity>
          <View style={styles.actionButtonRow}>
            <TouchableOpacity
              style={[
                styles.addButton,
                {
                  backgroundColor: score ? theme.colors.tertiary : "gray",
                },
              ]}
              onPress={handleAddScore}
              disabled={!score}
            >
              <Text style={styles.addButtonText}>Kaydet</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={[
                styles.addButton,
                { backgroundColor: theme.colors.secondary },
              ]}
              onPress={handleCloseModal}
            >
              <Text style={styles.addButtonText}>İptal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
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
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 4,
      paddingHorizontal: 10,
      flex: 1,
      marginRight: 10,
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    button: {
      height: 40,
      width: 100,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
    },
    actionButtonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    starButton: {
      backgroundColor: "#f0f0f0",
      padding: 10,
      borderRadius: 4,
      marginBottom: 20,
      justifyContent: "center",
    },
    buttonText: {
      fontSize: 14,
      color: "white",
      textAlign: "center",
    },
    addButton: {
      padding: 10,
      borderRadius: 4,
      alignItems: "center",
      width: "48%",
    },
    addButtonText: {
      color: "white",
      fontSize: 16,
    },
  });