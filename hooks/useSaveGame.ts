import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

interface Game {
  playerList: string[];
  scores: { [key: string]: number[] };
  prizes: { [key: string]: number[] };
  penalties: { [key: string]: number[] };
  totalScores: { [key: string]: number };
}

export const useSaveGame = () => {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    loadGame();
  }, []);

  const saveGame = async (game: Game) => {
    console.log("Saving game", game);
    try {
      await AsyncStorage.setItem("game", JSON.stringify(game));
      console.log("Game saved successfully");
    } catch (error) {
      console.error("Error saving game", error);
    }
  };

  const loadGame = async () => {
    try {
      const savedGame = await AsyncStorage.getItem("game");
      if (savedGame) {
        const parsedGame = JSON.parse(savedGame);
        
        const gameWithParsedPlayerList = {
          ...parsedGame,
          playerList: Array.isArray(parsedGame.playerList)
            ? parsedGame.playerList
            : JSON.parse(parsedGame.playerList),
        };
  
        setGame(gameWithParsedPlayerList);
        console.log("Game loaded successfully", gameWithParsedPlayerList);
      }
    } catch (error) {
      console.error("Error loading game", error);
    }
  };
  
  

  return { saveGame, game };
};
