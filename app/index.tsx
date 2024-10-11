import React, { useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { Button, PaperProvider, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { theme } from "@/constants/Colors";
import { Player, usePlayers } from "@/hooks/usePlayers";
import { ThemedView } from "@/components/ThemedView";
import PlayerSelectionModal from "@/components/PlayerSelectionModal";
import ModeSelectionModal from "@/components/ModeSelectionModal";
import TeamSelectionModal from "@/components/TeamSelectionModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { Game, useSaveGame } from "@/hooks/useSaveGame";
import { useAlert } from "@/hooks/useAlert";
import Alert from "@/components/Alert";

const Index = () => {
  const [activeModal, setActiveModal] = useState<
    "none" | "mode" | "player" | "team"
  >("none");
  const [gameMode, setGameMode] = useState<"single" | "team">("single");
  const { players, addPlayer } = usePlayers();
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [selectedTeamPlayers, setSelectedTeamPlayers] = useState<Player[]>([]);

  const router = useRouter();
  const { loadGame, loadAllGames } = useSaveGame();
  const { alert, showAlert } = useAlert();

  const startNewGame = () => {
    setActiveModal("mode");
  };

  const closeModals = () => {
    setActiveModal("none");
    setSelectedPlayers([]);
  };

  const onSelectMode = (mode: "single" | "team") => {
    setGameMode(mode);
    setActiveModal("player");
  };

  const onTogglePlayer = (selectedPlayerName: string) => {
    let updatedSelectedPlayers = [...selectedPlayers];
    const playerIndex = updatedSelectedPlayers.indexOf(selectedPlayerName);

    if (playerIndex === -1) {
      updatedSelectedPlayers.push(selectedPlayerName);
    } else {
      updatedSelectedPlayers.splice(playerIndex, 1);
    }

    setSelectedPlayers(updatedSelectedPlayers);
  };

  const onStartGame = () => {
    closeModals();
    router.push({
      pathname: "GameScreen",
      params: {
        players: JSON.stringify(selectedPlayers),
        startTime: new Date().toISOString(),
        gameMode,
        isContinuing: "false",
      },
    });
  };

  const continueLastGame = async () => {
    const game: Game = await loadGame();

    if (game) {
      router.push({
        pathname: "GameScreen",
        params: {
          players: JSON.stringify(game.playerList),
          scores: JSON.stringify(game.scores),
          prizes: JSON.stringify(game.prizes),
          penalties: JSON.stringify(game.penalties),
          totalScores: JSON.stringify(game.totalScores),
          startTime: JSON.stringify(game.startTime),
          isContinuing: "true",
        },
      });
    } else {
      showAlert("Kayıtlı oyun bulunamadı.");
    }
  };

  const handleAddPlayer = (playerName: string) => addPlayer(playerName);

  const onSelectTeams = () => {
    const selectedTeamPlayers = players.filter(
      (_, index) => selectedPlayers[index]
    );
    setSelectedTeamPlayers(selectedTeamPlayers);
    setActiveModal("team");
  };

  const onSaveTeams = (team1: Player[], team2: Player[]) => closeModals();

  const showAllGames = async () => router.push({ pathname: "AllGames" });

  const showStatistics = () => router.push({ pathname: "Statistics" });

  const showSettings = () => router.push({ pathname: "Settings" });

  const showGameRules = () => router.push({ pathname: "GameRules" });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <ParallaxScrollView
          headerImage={
            <ImageBackground
              source={require("../assets/images/okey.jpg")}
              style={styles.headerImage}
            />
          }
          headerBackgroundColor={{
            dark: "#1a1a1a",
            light: theme.colors.surface,
          }}
        >
          <ThemedView style={styles.container}>
            <Button
              mode="contained"
              onPress={startNewGame}
              style={styles.button}
              icon={() => (
                <Icon name="gamepad-variant" size={24} color="white" />
              )}
            >
              <Text style={styles.buttonLabel}>Yeni Oyuna Başla</Text>
            </Button>
          </ThemedView>

          <ThemedView style={styles.container}>
            <Button
              mode="contained"
              onPress={continueLastGame}
              style={styles.button}
              icon={() => (
                <Icon name="play-circle-outline" size={24} color="white" />
              )}
            >
              <Text style={styles.buttonLabel}>Son Oyuna Devam Et</Text>
            </Button>
          </ThemedView>

          <ThemedView style={styles.container}>
            <Button
              mode="contained"
              onPress={showAllGames}
              style={styles.button}
              icon={() => <Icon name="history" size={24} color="white" />}
            >
              <Text style={styles.buttonLabel}>Kayıtlı Oyunları Gör</Text>
            </Button>
          </ThemedView>

          <ThemedView style={styles.container}>
            <Button
              mode="contained"
              onPress={showStatistics}
              style={styles.button}
              icon={() => <Icon name="chart-line" size={24} color="white" />}
            >
              <Text style={styles.buttonLabel}>İstatistikler</Text>
            </Button>
          </ThemedView>

          <ThemedView style={styles.container}>
            <Button
              mode="contained"
              onPress={showSettings}
              style={styles.button}
              icon={() => <Icon name="cog" size={24} color="white" />}
            >
              <Text style={styles.buttonLabel}>Ayarlar</Text>
            </Button>
          </ThemedView>

          <ThemedView style={styles.container}>
            <Button
              mode="contained"
              onPress={showGameRules}
              style={styles.button}
              icon={() => (
                <Icon name="file-document-outline" size={24} color="white" />
              )}
            >
              <Text style={styles.buttonLabel}>Oyun Kuralları</Text>
            </Button>
          </ThemedView>
        </ParallaxScrollView>

        <ModeSelectionModal
          visible={activeModal === "mode"}
          onClose={closeModals}
          onSelectMode={onSelectMode}
        />

        <PlayerSelectionModal
          visible={activeModal === "player"}
          onClose={closeModals}
          players={players}
          selectedPlayers={selectedPlayers}
          onTogglePlayer={onTogglePlayer}
          onStartGame={onStartGame}
          onAddPlayer={handleAddPlayer}
          onSelectTeams={onSelectTeams}
          gameMode={gameMode}
        />

        <TeamSelectionModal
          visible={activeModal === "team"}
          onClose={closeModals}
          players={selectedTeamPlayers}
          onSaveTeams={onSaveTeams}
        />

        <Alert message={alert.message} visible={alert.visible} />
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
  headerImage: {
    width: "100%",
    height: 200,
  },
  button: {
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  buttonLabel: {
    justifyContent: "flex-start",
    textAlign: "left",
    color: "white",
  },
});

export default Index;
