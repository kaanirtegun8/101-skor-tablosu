import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Player } from "./usePlayers";

const useSelectedPlayer = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const loadSelectedPlayer = async () => {
    try {
      const savedPlayer = await AsyncStorage.getItem("selectedPlayer");
      if (savedPlayer) {
        setSelectedPlayer(JSON.parse(savedPlayer));
      }
    } catch (error) {
      console.error("Oyuncu verisi yüklenemedi:", error);
    }
  };

  const saveSelectedPlayer = async (player: Player | null) => {
    try {
      if (player) {
        await AsyncStorage.setItem("selectedPlayer", JSON.stringify(player));
      } else {
        await AsyncStorage.removeItem("selectedPlayer");
      }
    } catch (error) {
      console.error("Oyuncu verisi kaydedilemedi:", error);
    }
  };

  useEffect(() => {
    loadSelectedPlayer();
  }, []);

  useEffect(() => {
    if (selectedPlayer) {
      saveSelectedPlayer(selectedPlayer);
    }
  }, [selectedPlayer]);

  return { selectedPlayer, setSelectedPlayer };
};

export default useSelectedPlayer;
