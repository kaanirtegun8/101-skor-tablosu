import { useState, useEffect, useMemo } from "react";
import { filterOptions, Game, useSaveGame } from "@/hooks/useSaveGame";

export interface PlayerStatistic {
  playerName: string;
  score: number;
  startTime?: Date[] | undefined;
}
export interface PlayerStatistic {
  playerName: string;
  score: number;
}

enum PlayerRatingIndicator {
  AVERAGE_SCORE = 2,
  AVERAGE_SCORE_PER_ROUND = 2,
  AVERAGE_POSITION = 3,
  AVERAGE_PENALTY = 2,
  AVERAGE_REWARD = 1,

  CONSECUTIVE_200 = 1,
  CONSECUTIVE_NEGATIVE = 1,
}

const calculatePlayerRatingIndicator = (
  rewardPosition: number,
  averagePerRoundPosition: number,
  averagePosition: number,
  penaltyPosition: number,
  rankingPosition: number,
  length: number
): number => {
  return parseFloat(
    (
      PlayerRatingIndicator.AVERAGE_REWARD / rewardPosition +
      PlayerRatingIndicator.AVERAGE_SCORE_PER_ROUND / averagePerRoundPosition +
      PlayerRatingIndicator.AVERAGE_POSITION / averagePosition +
      penaltyPosition / PlayerRatingIndicator.AVERAGE_PENALTY +
      PlayerRatingIndicator.AVERAGE_SCORE / rankingPosition
    ).toFixed(2)
  );
};

const calculatePlayerRating = (
  averageScores: PlayerStatistic[],
  averageScoresPerRound: PlayerStatistic[],
  averageRankings: PlayerStatistic[],
  averagePenalties: PlayerStatistic[],
  averageRewards: PlayerStatistic[]
) => {
  const playerRatings: PlayerStatistic[] = [];

  const averageScoresPerRoundWithPositions = averageScoresPerRound.map(
    (average, index) => ({
      playerName: average.playerName,
      position: index + 1,
    })
  );

  const averageRankingsWithPositions = averageRankings
    .map((ranking) => ({
      playerName: ranking.playerName,
      score: ranking.score,
    }))
    .sort((a, b) => {
      if (a.score === b.score) {
        const aAveragePerRound = averageScoresPerRound.find(
          (r) => r.playerName === a.playerName
        );
        const bAveragePerRound = averageScoresPerRound.find(
          (r) => r.playerName === b.playerName
        );

        if (aAveragePerRound && bAveragePerRound) {
          return aAveragePerRound.score - bAveragePerRound.score;
        }
      }
      return a.score - b.score;
    });

  const rankedPlayersWithPositions = averageRankingsWithPositions.map(
    (ranking, index) => ({
      playerName: ranking.playerName,
      position: index + 1,
    })
  );

  const averageScoresWithPositions = averageScores.map((average, index) => ({
    playerName: average.playerName,
    position: index + 1,
  }));

  const averagePenaltiesWithPositions = averagePenalties.map(
    (penalty, index) => ({
      playerName: penalty.playerName,
      position: index + 1,
    })
  );

  const averageRewardsWithPositions = averageRewards.map((reward, index) => ({
    playerName: reward.playerName,
    position: index + 1,
  }));

  averageScoresWithPositions.forEach((average) => {
    const ranking = rankedPlayersWithPositions.find(
      (r) => r.playerName === average.playerName
    );
    const penalty = averagePenaltiesWithPositions.find(
      (p) => p.playerName === average.playerName
    );
    const reward = averageRewardsWithPositions.find(
      (r) => r.playerName === average.playerName
    );
    const averagePerRound = averageScoresPerRoundWithPositions.find(
      (r) => r.playerName === average.playerName
    );

    if (ranking && penalty && reward && averagePerRound) {
      playerRatings.push({
        playerName: average.playerName,
        score: calculatePlayerRatingIndicator(
          reward.position,
          averagePerRound.position,
          average.position,
          penalty.position,
          ranking.position,
          averageScores.length
        ),
      });
    }
  });

  return playerRatings.sort((a, b) => b.score - a.score);
};

const calculateMaxScoresPerPlayer = (games: Game[]): PlayerStatistic[] => {
  const playerScoresMap: { [key: string]: number[] } = {};

  games.forEach((game: Game) => {
    Object.keys(game.scores).forEach((player) => {
      if (!playerScoresMap[player]) {
        playerScoresMap[player] = [];
      }
      playerScoresMap[player].push(...game.scores[player]);
    });
  });

  return Object.keys(playerScoresMap)
    .map((player) => {
      const maxScore = Math.max(...playerScoresMap[player]);
      return { playerName: player, score: maxScore };
    })
    .sort((a, b) => b.score - a.score);
};

const calculateMinScoresPerPlayer = (games: Game[]): PlayerStatistic[] => {
  const playerScoresMap: { [key: string]: number[] } = {};

  games.forEach((game: Game) => {
    Object.keys(game.scores).forEach((player) => {
      if (!playerScoresMap[player]) {
        playerScoresMap[player] = [];
      }
      playerScoresMap[player].push(...game.scores[player]);
    });
  });

  return Object.keys(playerScoresMap)
    .map((player) => {
      const minScore = Math.min(...playerScoresMap[player]);
      return { playerName: player, score: minScore };
    })
    .sort((a, b) => a.score - b.score);
};

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

const calculateAverageRankingPosition = (games: Game[]): PlayerStatistic[] => {
  const playerRankingMap: { [key: string]: number[] } = {};

  games.forEach((game: Game) => {
    const rankedPlayers = Object.keys(game.totalScores).sort(
      (a, b) => game.totalScores[a] - game.totalScores[b]
    );

    rankedPlayers.forEach((player, index) => {
      if (!playerRankingMap[player]) {
        playerRankingMap[player] = [];
      }
      playerRankingMap[player].push(index + 1);
    });
  });

  return Object.keys(playerRankingMap)
    .map((player) => {
      const totalRanking = playerRankingMap[player].reduce(
        (sum, rank) => sum + rank,
        0
      );
      const averageRanking = totalRanking / playerRankingMap[player].length;
      return {
        playerName: player,
        score: parseFloat(averageRanking.toFixed(1)),
      };
    })
    .sort((a, b) => a.score - b.score);
};

export const useStatistic = (filterOptions?: filterOptions) => {
  const [games, setGames] = useState<Game[]>([]);
  const { loadAllGames } = useSaveGame();

  useEffect(() => {
    const fetchGames = async () => {
      const allGames = await loadAllGames(filterOptions);
      setGames(allGames);
    };

    fetchGames();
  }, [filterOptions]);

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
      Object.keys(game.totalScores).forEach((player) => {
        if (!playerPenaltiesMap[player]) {
          playerPenaltiesMap[player] = [];
        }

        if(game.penalties[player]){
          const totalPenalties = game.penalties[player].reduce(
            (sum, penalty) => sum + penalty * -1,
            0
          );
          playerPenaltiesMap[player].push(totalPenalties);
        } else {
          playerPenaltiesMap[player].push(0);
        }
      });
    });

    return calculateAverageRewardsOrPenalties(playerPenaltiesMap);
  }, [games]);

  const calculateAverageRewardsByGame = useMemo(() => {
    const playerRewardsMap: { [key: string]: number[] } = {};
  
    games.forEach((game: Game) => {
      Object.keys(game.totalScores).forEach((player) => {
        if (!playerRewardsMap[player]) {
          playerRewardsMap[player] = [];
        }
  
        if (game.prizes[player]) {
          const totalRewards = game.prizes[player].reduce(
            (sum, reward) => sum + reward,
            0
          );
          playerRewardsMap[player].push(totalRewards);
        } else {
          playerRewardsMap[player].push(0);
        }
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

  const calculateAverageRankingByGame = useMemo(() => {
    return calculateAverageRankingPosition(games);
  }, [games]);

  const maxScores = useMemo(() => {
    return calculateMaxScoresPerPlayer(games);
  }, [games]);

  const minScores = useMemo(() => {
    return calculateMinScoresPerPlayer(games);
  }, [games]);

  const playerRatings = useMemo(() => {
    const averageScores = calculateAverageScoresByMatch;
    const averageScoresPerRound = calculateAverageScoresPerRound;
    const averageRankings = calculateAverageRankingByGame;
    const averagePenalties = calculateAveragePenaltiesByGame;
    const averageRewards = calculateAverageRewardsByGame;

    return calculatePlayerRating(
      averageScores,
      averageScoresPerRound,
      averageRankings,
      averagePenalties,
      averageRewards
    );
  }, [games]);

  return {
    games,
    calculateAverageScoresByMatch,
    calculateAverageScoresPerRound,
    calculateAveragePenaltiesByGame,
    calculateAverageRewardsByGame,
    calculateConsecutive200s,
    calculateConsecutiveNegatives,
    calculateAverageRankingByGame,
    maxScores,
    minScores,
    playerRatings,
  };
};
