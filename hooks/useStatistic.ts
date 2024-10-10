import { useState, useEffect, useMemo } from "react";
import { Game, useSaveGame } from "@/hooks/useSaveGame";

export interface PlayerStatistic {
  playerName: string;
  score: number;
  startTime?: Date[] | undefined;
}

const calculateMaxConsecutiveNegatives = (scoresMap: {
  [key: string]: number[];
}): PlayerStatistic[] => {
  return Object.keys(scoresMap)
    .map((player) => {
      let maxConsecutive = 0;
      let currentStreak = 0;

      scoresMap[player].forEach((score) => {
        if (score < 0) {
          currentStreak++;
          if (currentStreak > maxConsecutive) {
            maxConsecutive = currentStreak;
          }
        } else {
          currentStreak = 0; 
        }
      });

      return { playerName: player, score: maxConsecutive };
    })
    .sort((a, b) => b.score - a.score); 
};

const calculateAverageScores = (scoresMap: {
  [key: string]: number[];
}): PlayerStatistic[] => {
  return Object.keys(scoresMap)
    .map((player) => {
      const total = scoresMap[player].reduce((sum, score) => sum + score, 0);
      const average = total / scoresMap[player].length;
      return { playerName: player, score: Math.round(average) };
    })
    .sort((a, b) => a.score - b.score);
};

const calculateAverageRewardsOrPenalties = (map: {
  [key: string]: number[];
}): PlayerStatistic[] => {
  return Object.keys(map)
    .map((player) => {
      const total = map[player].reduce((sum, value) => sum + value, 0);
      const average = total / map[player].length;
      return { playerName: player, score: Math.round(average) };
    })
    .sort((a, b) => b.score - a.score);
};

const calculateMaxConsecutive200s = (scoresMap: {
  [key: string]: number[];
}): PlayerStatistic[] => {
  return Object.keys(scoresMap)
    .map((player) => {
      let maxConsecutive = 0;
      let currentStreak = 0;

      scoresMap[player].forEach((score) => {
        if (score >= 200) {
          currentStreak++;
          if (currentStreak > maxConsecutive) {
            maxConsecutive = currentStreak;
          }
        } else {
          currentStreak = 0;
        }
      });

      return { playerName: player, score: maxConsecutive };
    })
    .sort((a, b) => b.score - a.score); 
};

export const useStatistic = () => {
  const [games, setGames] = useState<Game[]>([]);
  const { loadAllGames } = useSaveGame();

  useEffect(() => {
    const fetchGames = async () => {
      const allGames = await loadAllGames();
      setGames(allGames);
    };

    fetchGames();
  }, []);

  const calculateAverageScoresByMatch = useMemo(() => {
    const playerScoresMap: { [key: string]: number[] } = {};

    games.forEach((game: Game) => {
      Object.keys(game.totalScores).forEach((player) => {
        if (!playerScoresMap[player]) {
          playerScoresMap[player] = [];
        }
        playerScoresMap[player].push(game.totalScores[player]);
      });
    });

    return calculateAverageScores(playerScoresMap);
  }, [games]);

  const calculateAverageScoresPerRound = useMemo(() => {
    const playerScoresMap: { [key: string]: number[] } = {};

    games.forEach((game: Game) => {
      Object.keys(game.scores).forEach((player) => {
        if (!playerScoresMap[player]) {
          playerScoresMap[player] = [];
        }
        const totalRounds = game.scores[player].length;
        const totalScore = game.scores[player].reduce(
          (sum, score) => sum + score,
          0
        );
        const averageScorePerRound = totalScore / totalRounds;

        playerScoresMap[player].push(averageScorePerRound);
      });
    });

    return calculateAverageScores(playerScoresMap);
  }, [games]);

  const calculateAveragePenaltiesByGame = useMemo(() => {
    const playerPenaltiesMap: { [key: string]: number[] } = {};

    games.forEach((game: Game) => {
      Object.keys(game.penalties).forEach((player) => {
        if (!playerPenaltiesMap[player]) {
          playerPenaltiesMap[player] = [];
        }
        const totalPenalties = game.penalties[player].reduce(
          (sum, penalty) => sum + penalty * -1,
          0
        );
        playerPenaltiesMap[player].push(totalPenalties);
      });
    });

    return calculateAverageRewardsOrPenalties(playerPenaltiesMap);
  }, [games]);

  const calculateAverageRewardsByGame = useMemo(() => {
    const playerRewardsMap: { [key: string]: number[] } = {};

    games.forEach((game: Game) => {
      Object.keys(game.prizes).forEach((player) => {
        if (!playerRewardsMap[player]) {
          playerRewardsMap[player] = [];
        }
        const totalRewards = game.prizes[player].reduce(
          (sum, reward) => sum + reward,
          0
        );
        playerRewardsMap[player].push(totalRewards);
      });
    });

    return calculateAverageRewardsOrPenalties(playerRewardsMap);
  }, [games]);

  const calculateConsecutive200s = useMemo(() => {
    const playerScoresMap: { [key: string]: number[] } = {};

    games.forEach((game: Game) => {
      Object.keys(game.scores).forEach((player) => {
        if (!playerScoresMap[player]) {
          playerScoresMap[player] = [];
        }
        playerScoresMap[player].push(...game.scores[player]); 
      });
    });

    return calculateMaxConsecutive200s(playerScoresMap);
  }, [games]);

  const calculateConsecutiveNegatives = useMemo(() => {
    const playerScoresMap: { [key: string]: number[] } = {};

    games.forEach((game: Game) => {
      Object.keys(game.scores).forEach((player) => {
        if (!playerScoresMap[player]) {
          playerScoresMap[player] = [];
        }
        playerScoresMap[player].push(...game.scores[player]);
      });
    });

    return calculateMaxConsecutiveNegatives(playerScoresMap);
  }, [games]);

  return {
    games,
    calculateAverageScoresByMatch,
    calculateAverageScoresPerRound,
    calculateAveragePenaltiesByGame,
    calculateAverageRewardsByGame,
    calculateConsecutive200s,
    calculateConsecutiveNegatives
  };
};
