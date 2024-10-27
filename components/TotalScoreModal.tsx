import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { theme } from "@/constants/Colors";
import useCalculateGameDuration from "@/hooks/useCalculateGameDuration";
import { Game } from "@/hooks/useSaveGame";

interface TotalScoreModalProps {
  visible: boolean;
  onClose: () => void;
  totalScore: { [key: string]: number };
  game: Game;
}

export const TotalScoreModal = ({
  onClose,
  totalScore,
  visible,
  game
}: TotalScoreModalProps) => {
  const generateLeaderboard = (totalScores: { [key: string]: number }) => {
    const sortedPlayers = Object.entries(totalScores).sort(
      ([, a], [, b]) => a - b
    );

    const secondPlaceEmojiList = [
      "🤴",
      "🎩",
      "👨‍🚀",
      "🧑‍⚖️",
      "🦸",
      "🕵️",
      "🧙‍♂️",
      "🎓",
      "🤵",
      "🕴️",
      "🧛",
    ];

    const thirdPlaceEmojiList = [
      "💩",
      "🪣",
      "🦨",
      "🧻",
      "🐌",
      "🧀",
      "🥑",
      "🐢",
      "🐸",
      "🪳",
      "🍟",
      "🍔",
      "🎃",
      "🤡",
    ];

    return sortedPlayers.map(([player, score], index) => {
      let emoji = "";

      if (index === 0) {
        emoji = "👑";
      } else if (index === sortedPlayers.length - 1) {
        emoji = "🫏";
      } else if (index === 1) {
        emoji =
          secondPlaceEmojiList[
            Math.floor(Math.random() * secondPlaceEmojiList.length)
          ];
      } else if (index === 2) {
        emoji =
          thirdPlaceEmojiList[
            Math.floor(Math.random() * thirdPlaceEmojiList.length)
          ];
      } else {
        emoji = "🤡";
      }
      return `${emoji} ${player}:      ${score} puan`;
    });
  };

  const leaderboard = generateLeaderboard(game.totalScores);

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.content}>
        <Text style={styles.title}>Toplam Skorlar</Text>

        {leaderboard.map((entry, index) => {
          const [emojiPlayer, score] = entry.split(":");
          const [emoji, player] = emojiPlayer.split(" ");

          return (
            <View key={index} style={styles.leaderboardRow}>
              <Text style={styles.emojiText}>{emoji}</Text>
              <Text style={styles.playerText}>{player}</Text>
              <Text style={styles.scoreText}>{score}</Text>
            </View>
          );
        })}

        <View style={styles.time}>
          <Text style={styles.timeText}>
            Oyun Süresi:{" "}
            {useCalculateGameDuration({
              startTime: game.startTime,
              endTime: game.endTime,
            })}
          </Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 16,
    textAlign: "center",
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
    backgroundColor: "#ccc",
    width: "100%",
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: "600",
    textAlign: "center",
  },
  leaderboardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  emojiText: {
    fontSize: 40,
    marginRight: 8,
  },
  playerText: {
    fontSize: 18,
    color: theme.colors.text,
  },
  scoreText: {
    fontSize: 18,
    color: theme.colors.text,
    marginLeft: "auto",
  },
  time: {
    marginTop: 30,
  },
  timeText: {
    fontSize: 16,
    color: theme.colors.text,
  },
});
