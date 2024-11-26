import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Game {
  playerList: string[];
  scores: { [key: string]: number[] };
  prizes: { [key: string]: number[] };
  penalties: { [key: string]: number[] };
  totalScores: { [key: string]: number };
  startTime?: Date;
  endTime?: Date;
  gameMode?: "single" | "team";
}

export interface filterOptions {
  startDate?: Date;
  players?: string[];
  playerCount?: number;
  gameMode?: "single" | "team";
}

export const useSaveGame = () => {
  const saveLastGame = async (game: Game) => {
    try {
      await AsyncStorage.setItem("lastGame", JSON.stringify(game));
    } catch (error) {
      console.error("Error saving last game", error);
    }
  };

  const saveAllGames = async (game: Game) => {
    try {
      const completedGame: Game = { ...game, endTime: new Date() };
      const savedGames = await AsyncStorage.getItem("allGames");
      const parsedGames = savedGames ? JSON.parse(savedGames) : [];
      const updatedGames = [...parsedGames, completedGame];

      await AsyncStorage.setItem("allGames", JSON.stringify(updatedGames));

      await AsyncStorage.removeItem("lastGame");
    } catch (error) {
      console.error("Error saving all games", error);
    }
  };

  const loadGame = async () => {
    try {
      const savedLastgame = await AsyncStorage.getItem("lastGame");
      if (savedLastgame) {
        const parsedGame = JSON.parse(savedLastgame);
        const gameWithParsedPlayerList = {
          ...parsedGame,
          playerList: Array.isArray(parsedGame.playerList)
            ? parsedGame.playerList
            : JSON.parse(parsedGame.playerList),
        };

        return gameWithParsedPlayerList;
      }
      return null;
    } catch (error) {
      console.error("Error loading last game", error);
      return null;
    }
  };

  const loadAllGames = async (filterOptions?: filterOptions) => {
    try {
      const savedGames = await AsyncStorage.getItem("allGames");
      if (!savedGames) return [];

      let parsedGames: Game[] = JSON.parse(savedGames);

      if (filterOptions) {
        const { startDate, players, playerCount, gameMode } = filterOptions;

        parsedGames = parsedGames.filter((game) => {
          const gameModeMatch = gameMode
            ? (game.gameMode || "single") === gameMode
            : true;
          const startDateMatch = startDate
            ? new Date(game.startTime!) >= new Date(startDate)
            : true;
          const playerCountMatch = playerCount
            ? game.playerList.length === playerCount
            : true;
          const playersMatch = players
            ? players.every((player) => game.playerList.includes(player))
            : true;

          return (
            startDateMatch && playerCountMatch && playersMatch && gameModeMatch
          );
        });
      }

      return parsedGames;
    } catch (error) {
      console.error("Error loading all games", error);
      return [];
    }
  };

  const finishGame = async (game: Game) => {
    await saveAllGames(game);
  };

  return { saveLastGame, loadGame, loadAllGames, finishGame };
};
