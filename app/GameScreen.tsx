import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { theme } from "@/constants/Colors";
import ScoreTable from "@/components/ScoreTable";
import PenaltyTable from "@/components/PenaltyTable";
import { AddScoreModal } from "@/components/AddScoreModal";
import { AddPrizeAndPenaltyModal } from "@/components/AddPrizeAndPenaltyModal";
import { TotalScoreModal } from "@/components/TotalScoreModal";
import { Game, useSaveGame } from "@/hooks/useSaveGame";
import DiceComponent from "@/components/Dice";
import EndGameModal from "@/components/EndGameModal";
import { useAlert } from "@/hooks/useAlert";
import Alert from "@/components/Alert";
import useDiceSystem from "@/hooks/useDiceSystem";

const GameScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPrizeModalVisible, setPrizeModalVisible] = useState(false);
  const [isTotalScoreModalVisible, setTotalScoreModalVisible] = useState(false);
  const [isEndGameModalVisible, setEndGameModalVisible] = useState(false);
  const [scores, setScores] = useState<{ [key: string]: number[] }>({});
  const [penalties, setPenalties] = useState<{ [key: string]: number[] }>({});
  const [prizes, setPrizes] = useState<{ [key: string]: number[] }>({});
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [totalScores, setTotalScores] = useState<{ [key: string]: number }>({});

  const { isDiceSystemEnabled } = useDiceSystem();

  const {
    players = [],
    gameMode,
    scores: savedScores,
    prizes: savedPrizes,
    penalties: savedPenalties,
    totalScores: savedTotalScores,
    isContinuing,
    startTime,
  } = useLocalSearchParams();

  const { showAlert, alert } = useAlert();

  const continuingGame = isContinuing === "true";

  const cleanStartTime =
    typeof startTime === "string" ? startTime.replaceAll('"', "") : startTime;

  const gameStartTime = Array.isArray(cleanStartTime)
    ? cleanStartTime.length > 0
      ? new Date(cleanStartTime[0])
      : new Date()
    : typeof cleanStartTime === "string"
    ? new Date(cleanStartTime)
    : new Date();

  useEffect(() => {
    if (continuingGame) {
      setScores(savedScores ? JSON.parse(savedScores as string) : {});
      setPrizes(savedPrizes ? JSON.parse(savedPrizes as string) : {});
      setPenalties(savedPenalties ? JSON.parse(savedPenalties as string) : {});
      setTotalScores(
        savedTotalScores ? JSON.parse(savedTotalScores as string) : {}
      );
    }
  }, [
    continuingGame,
    savedScores,
    savedPrizes,
    savedPenalties,
    savedTotalScores,
  ]);

  useEffect(() => {
    if (
      Object.keys(scores).length ||
      Object.keys(prizes).length ||
      Object.keys(penalties).length
    ) {
      handleGameSave();
    }
  }, [scores, prizes, penalties, totalScores]);

  const { saveLastGame, finishGame } = useSaveGame();

  const handleGameSave = async () => {
    const game = {
      playerList,
      scores,
      prizes,
      penalties,
      totalScores,
      startTime: gameStartTime,
      gameMode,
    } as Game;

    try {
      await saveLastGame(game);
    } catch (error) {
      console.error("Failed to save the game:", error);
    }
  };

  const handleAddScore = (playerName: string, score: number) => {
    setScores((prevScores) => {
      const playerScores = prevScores[playerName] || [];
      return {
        ...prevScores,
        [playerName]: [...playerScores, score],
      };
    });
  };

  const togglePrizeModal = () => {
    setPrizeModalVisible(!isPrizeModalVisible);
  };

  const toggleTotalScoreModal = () => {
    setTotalScoreModalVisible(!isTotalScoreModalVisible);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddPrizeOrPenalty = (playerName: string, score: number) => {
    if (score > 0) {
      setPrizes((prevPrizes) => {
        const playerPrizes = prevPrizes[playerName] || [];
        return {
          ...prevPrizes,
          [playerName]: [...playerPrizes, score],
        };
      });
    } else {
      setPenalties((prevPenalties) => {
        const playerPenalties = prevPenalties[playerName] || [];
        return {
          ...prevPenalties,
          [playerName]: [...playerPenalties, score],
        };
      });
    }
    togglePrizeModal();
  };

  const handleTogglePrizeModal = (playerName: string) => {
    setSelectedPlayer(playerName);
    togglePrizeModal();
  };

  const handleToggleEndGameModal = () => {
    if (Object.keys(scores).length === 0) {
      showAlert("Oyunu bitirebilmek için en az bir el skorunu girmelisiniz.");
      return;
    }

    calculateTotalScores();
    setEndGameModalVisible(!isEndGameModalVisible);
  };

  const handleOpenTotalScoreModal = () => {
    calculateTotalScores();
    toggleTotalScoreModal();
  };

  const calculateTotalScores = () => {
    const totalScores = playerList.reduce(
      (acc: { [key: string]: number }, playerName: string) => {
        const playerScores = scores[playerName] || [];
        const playerPenalties = penalties[playerName] || [];
        const playerPrizes = prizes[playerName] || [];

        const playerTotalScore =
          playerScores.reduce((acc, score) => acc + score, 0) +
          playerPenalties.reduce((acc, penalty) => acc - penalty, 0) +
          playerPrizes.reduce((acc, prize) => acc - prize, 0);

        return {
          ...acc,
          [playerName]: playerTotalScore,
        };
      },
      {}
    );

    setTotalScores(totalScores);
  };

  const handleFinishGame = () => {
    calculateTotalScores();

    const game = {
      playerList,
      scores,
      prizes,
      penalties,
      totalScores,
      startTime: gameStartTime,
      gameMode,
    } as Game;

    finishGame(game);
    handleToggleEndGameModal();
    router.push("/");
  };

  const playerList = Array.isArray(players)
    ? players
    : players
    ? JSON.parse(players)
    : [];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.wrapper}>
        <ScoreTable
          playerList={playerList}
          scores={scores}
          onPrizeOrPenaltyModalToggle={handleTogglePrizeModal}
        />
        <PenaltyTable
          playerList={playerList}
          penalties={penalties}
          prizes={prizes}
        />
        {isDiceSystemEnabled && <DiceComponent />}
      </ScrollView>

      <View style={styles.actionButtons}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={handleOpenTotalScoreModal}
            style={styles.scoreButton}
          >
            <Text style={styles.buttonText}>Toplam Skor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleToggleEndGameModal}
            style={styles.endGameButton}
          >
            <Text style={styles.buttonText}>Oyunu Bitir</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={toggleModal} style={styles.addScoreButton}>
          <Text style={styles.addScoreButtonText}>Yeni El Skoru Gir</Text>
        </TouchableOpacity>
      </View>

      <AddScoreModal
        onAddScore={handleAddScore}
        onClose={toggleModal}
        playerList={playerList}
        visible={isModalVisible}
        rountCount={scores[playerList[0]]?.length + 1 || 1}
      />

      <AddPrizeAndPenaltyModal
        visible={isPrizeModalVisible}
        playerName={selectedPlayer || ""}
        onClose={togglePrizeModal}
        onAddPrizeOrPenalty={handleAddPrizeOrPenalty}
      />

      <TotalScoreModal
        visible={isTotalScoreModalVisible}
        onClose={toggleTotalScoreModal}
        totalScore={totalScores}
        game={{
          playerList,
          scores,
          prizes,
          penalties,
          totalScores,
          startTime: gameStartTime,
        }}
      />

      <EndGameModal
        visible={isEndGameModalVisible}
        onClose={handleToggleEndGameModal}
        game={{
          playerList,
          scores,
          prizes,
          penalties,
          totalScores,
          startTime: gameStartTime,
        }}
        finishGame={handleFinishGame}
      />
      <Alert message={alert.message} visible={alert.visible} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 8,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  scoreButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: "48%",
    alignItems: "center",
  },
  endGameButton: {
    backgroundColor: "#f44336",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: "48%",
    alignItems: "center",
  },
  addScoreButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    marginTop: 15,
  },
  addScoreButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  actionButtons: {
    alignItems: "center",
    backgroundColor: theme.colors.background,
    paddingBottom: 20,
    paddingHorizontal: 8,
    width: "100%",
  },
  diceContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  diceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default GameScreen;
