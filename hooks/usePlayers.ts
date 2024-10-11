import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Player {
  id: number;
  name: string;
}

export const usePlayers = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    try {
      const storedPlayers = await AsyncStorage.getItem('players');
      if (storedPlayers) {
        setPlayers(JSON.parse(storedPlayers));
      }
    } catch (error) {
      console.error('Error loading players', error);
    }
  };

  const savePlayers = async (players: Player[]) => {
    try {
      await AsyncStorage.setItem('players', JSON.stringify(players));
    } catch (error) {
      console.error('Error saving players', error);
    }
  };

  const addPlayer = (playerName: string) => {
    if (playerName.trim()) {
      const newPlayer: Player = { id: players.length + 1, name: playerName.trim() }; 
      const updatedPlayers = [...players, newPlayer];
      setPlayers(updatedPlayers);
      savePlayers(updatedPlayers);
    }
  };

  return { players, addPlayer };
};
