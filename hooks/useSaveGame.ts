import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Game {
  playerList: string[];
  scores: { [key: string]: number[] };
  prizes: { [key: string]: number[] };
  penalties: { [key: string]: number[] };
  totalScores: { [key: string]: number };
  startTime?: Date;
  endTime?: Date;
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

  const loadAllGames = async () => {
    try {
      const savedGames = await AsyncStorage.getItem("allGames");
      if (savedGames) {
        const parsedGames = JSON.parse(savedGames);
        return parsedGames;
      }
      return [];
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
