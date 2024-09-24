import { theme } from "@/constants/Colors";
import { Game } from "@/hooks/useSaveGame";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

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

  const calculateGameDuration = () => {
    const now = new Date();
    const startTime = game.startTime ? new Date(game.startTime) : now;
    const durationInMilliseconds = now.getTime() - startTime.getTime();

    const minutes = Math.floor((durationInMilliseconds / 1000 / 60) % 60);
    const hours = Math.floor(durationInMilliseconds / 1000 / 60 / 60);

    return hours > 0 ? `${hours} saat ${minutes} dakika` : `${minutes} dakika`;
  };

  const leaderboard = generateLeaderboard(game.totalScores);

  return (
    <Modal isVisible={visible} style={styles.modal}>
      <View style={styles.content}>
        <Text style={styles.title}>Liderlik Tablosu</Text>

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
            Oyun Süresi: {calculateGameDuration()}
          </Text>
        </View>

        <View style={styles.divider} />

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
      padding: 12,
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
    actionButtonsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    divider: {
      height: 1,
      backgroundColor: "#ccc",
      width: "100%",
      marginBottom: 20,
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

export default EndGameModal;
