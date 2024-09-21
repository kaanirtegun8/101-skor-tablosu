import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Text, Button, IconButton, Card } from "react-native-paper";
import PlayerList from "@/components/PlayerList";
import Modal from "react-native-modal";
import { MIN_PLAYER_COUNT } from "@/constants/GameRules";
import { Player } from "@/hooks/usePlayers";

interface PlayerSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  players: Player[];
  selectedPlayers: boolean[];
  onTogglePlayer: (index: number) => void;
  onStartGame: () => void;
  onAddPlayer: (playerName: string) => void;
  onSelectTeams: () => void; 
  gameMode: 'single' | 'team';
}

const PlayerSelectionModal = ({
  visible,
  onClose,
  players,
  selectedPlayers,
  onTogglePlayer,
  onStartGame,
  onAddPlayer,
  onSelectTeams,
  gameMode,
}: PlayerSelectionModalProps) => {
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      onAddPlayer(newPlayerName.trim());
      setNewPlayerName('');
      setIsAddingPlayer(false);
    }
  };

  const selectedCount = selectedPlayers.filter(Boolean).length;

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      style={styles.modal}
      swipeDirection="down"
      onSwipeComplete={onClose}
      propagateSwipe={true}
    >
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.content}>
          {isAddingPlayer ? (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>Oyuncu Ekle</Text>
                <IconButton
                  icon="close"
                  onPress={() => setIsAddingPlayer(false)}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Oyuncu İsmi"
                value={newPlayerName}
                onChangeText={setNewPlayerName}
              />
              <Button
                mode="contained"
                onPress={handleAddPlayer}
                style={styles.addButton}
              >
                Ekle
              </Button>
            </>
          ) : (
            <>
              <View style={styles.headerContainer}>
                <View style={styles.header}>
                  <Text style={styles.title}>Oyuncu Seç</Text>
                  <IconButton icon="close" onPress={onClose} />
                </View>
                <View style={styles.subHeader}>
                  <Text>Oyuncular</Text>
                  <Button mode="text" onPress={() => setIsAddingPlayer(true)}>
                    Oyuncu Ekle
                  </Button>
                </View>
              </View>

              <PlayerList
                players={players}
                selectedPlayers={selectedPlayers}
                onTogglePlayer={onTogglePlayer}
              />

              {gameMode === "team" ? (
                <Button
                  mode="contained"
                  onPress={onSelectTeams}
                  style={styles.startButton}
                  disabled={selectedCount % 2 !== 0}
                >
                  Takımları Seç
                </Button>
              ) : (
                <Button
                  mode="contained"
                  onPress={onStartGame}
                  style={styles.startButton}
                  disabled={selectedCount < MIN_PLAYER_COUNT}
                >
                  Oyuna Başla
                </Button>
              )}
            </>
          )}
        </View>
      </KeyboardAvoidingView>
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
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerContainer: {
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  startButton: {
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  addButton: {
    marginTop: 10,
    marginBottom: 20,
  },
});

export default PlayerSelectionModal;
