import React, { useState } from "react";
import { StyleSheet, ImageBackground, StatusBar } from "react-native";
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

type ValidPath = "/GameScreen" | "/AllGames" | "/GameRules" | "/Settings" | "/Statistics" | "/";

const Index = () => {
  const [activeModal, setActiveModal] = useState<"none" | "mode" | "player" | "team">("none");
  const [gameMode, setGameMode] = useState<"single" | "team">("single");
  const { players, addPlayer } = usePlayers();
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [selectedTeamPlayers, setSelectedTeamPlayers] = useState<Player[]>([]);

  const router = useRouter();
  const { loadGame } = useSaveGame();
  const { alert, showAlert } = useAlert();

  const startNewGame = () => setActiveModal("mode");

  const closeModals = () => {
    setActiveModal("none");
    setSelectedPlayers([]);
  };

  const onSelectMode = (mode: "single" | "team") => {
    setGameMode(mode);
    setActiveModal("player");
  };

  const onTogglePlayer = (playerName: string) => {
    setSelectedPlayers((prevPlayers) =>
      prevPlayers.includes(playerName)
        ? prevPlayers.filter((name) => name !== playerName)
        : [...prevPlayers, playerName]
    );
  };

  const onStartGame = () => {
    closeModals();
    router.push({
      pathname: "/GameScreen" as ValidPath,
      params: {
        players: JSON.stringify(selectedPlayers),
        startTime: new Date().toISOString(),
        gameMode,
        isContinuing: "false",
      },
    });
  };

  const continueLastGame = async () => {
    try {
      const game: Game | null = await loadGame();
      if (game) {
        router.push({
          pathname: "/GameScreen" as ValidPath,
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
    } catch (error) {
      showAlert("Oyun yüklenirken bir hata oluştu.");
    }
  };

  const handleAddPlayer = (playerName: string) => addPlayer(playerName);

  const onSelectTeams = () => {
    const selectedTeamPlayers = players.filter((player) =>
      selectedPlayers.includes(player.name)
    );
    setSelectedTeamPlayers(selectedTeamPlayers);
    setActiveModal("team");
  };

  const onSaveTeams = (team1: Player[], team2: Player[]) => {
    closeModals();
    const playerList = [
      team1.map((player) => player.name).join(" "),
      team2.map((player) => player.name).join(" "),
    ];

    router.push({
      pathname: "/GameScreen" as ValidPath,
      params: {
        players: JSON.stringify(playerList),
        startTime: new Date().toISOString(),
        gameMode: "team",
        isContinuing: "false",
      },
    });
  };

  const navigateTo = (path: ValidPath) => router.push({ pathname: path });

  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <PaperProvider theme={theme}>
        <StatusBar barStyle="dark-content" />
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
          {[
            {
              label: "Yeni Oyuna Başla",
              onPress: startNewGame,
              icon: "gamepad-variant",
            },
            {
              label: "Son Oyuna Devam Et",
              onPress: continueLastGame,
              icon: "play-circle-outline",
            },
            {
              label: "Kayıtlı Oyunları Gör",
              onPress: () => navigateTo("/AllGames"),
              icon: "history",
            },
            {
              label: "İstatistikler",
              onPress: () => navigateTo("/Statistics"),
              icon: "chart-line",
            },
            {
              label: "Ayarlar",
              onPress: () => navigateTo("/Settings"),
              icon: "cog",
            },
            {
              label: "Oyun Kuralları",
              onPress: () => navigateTo("/GameRules"),
              icon: "file-document-outline",
            },
          ].map(({ label, onPress, icon }, index) => (
            <ThemedView style={styles.container} key={index}>
              <Button
                mode="contained"
                onPress={onPress}
                contentStyle={styles.buttonContent}
                style={styles.button}
                icon={() => <Icon name={icon} size={24} color="white" />}
              >
                <Text style={styles.buttonLabel}>{label}</Text>
              </Button>
            </ThemedView>
          ))}
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
  gestureHandler: {
    flex: 1,
  },
  container: {
    backgroundColor: theme.colors.background,
  },
  headerImage: {
    width: "100%",
    height: 200,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  button: {
    marginVertical: 12,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  buttonContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonLabel: {
    justifyContent: "flex-start",
    textAlign: "left",
    fontSize: 18,
    color: "white",
  },
});

export default Index;