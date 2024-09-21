import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { theme } from "@/constants/Colors";
import ScoreTable from "@/components/ScoreTable";
import PenaltyTable from "@/components/PenaltyTable";
import { AddScoreModal } from "@/components/AddScoreModal";
import { AddPrizeAndPenaltyModal } from "@/components/AddPrizeAndPenaltyModal";
import { TotalScoreModal } from "@/components/TotalScoreModal";
import { useSaveGame } from "@/hooks/useSaveGame";
import DiceComponent from "@/components/Dice";

const GameScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPrizeModalVisible, setPrizeModalVisible] = useState(false);
  const [isTotalScoreModalVisible, setTotalScoreModalVisible] = useState(false);
  const [scores, setScores] = useState<{ [key: string]: number[] }>({});
  const [penalties, setPenalties] = useState<{ [key: string]: number[] }>({});
  const [prizes, setPrizes] = useState<{ [key: string]: number[] }>({});
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [totalScores, setTotalScores] = useState<{ [key: string]: number }>({});

  const {
    players,
    gameMode,
    scores: savedScores,
    prizes: savedPrizes,
    penalties: savedPenalties,
    totalScores: savedTotalScores,
    isContinuing,
  } = useLocalSearchParams();

  const continuingGame = isContinuing === "true";

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

  const { saveGame } = useSaveGame();

  const handleGameSave = () => {
    saveGame({
      playerList: players as string[],
      scores,
      prizes,
      penalties,
      totalScores,
    });
  };

  const handleAddScore = (playerName: string, score: number) => {
    setScores((prevScores) => {
      const playerScores = prevScores[playerName] || [];
      return {
        ...prevScores,
        [playerName]: [...playerScores, score],
      };
    });

    handleGameSave();
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
    handleGameSave();
  };

  const handleTogglePrizeModal = (playerName: string) => {
    setSelectedPlayer(playerName);
    togglePrizeModal();
    handleGameSave();
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
    toggleTotalScoreModal();
    handleGameSave();
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

        <DiceComponent />
        
      </ScrollView>

      <View style={styles.actionButtons}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={calculateTotalScores}
            style={styles.scoreButton}
          >
            <Text style={styles.buttonText}>Toplam Skor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("")}
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
      />
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
