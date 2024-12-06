import { Player } from "@/hooks/usePlayers";
import { Game, useSaveGame } from "@/hooks/useSaveGame";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

interface PlayerStatistics {
  player: Player | null;
}
const PlayerStatistics = ({ player }: PlayerStatistics) => {
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  const { loadAllGames } = useSaveGame();

  useEffect(() => {
    const fetchGames = async () => {
      const allGames = await loadAllGames({
        players: [player?.name || ""],
      });
      setFilteredGames(allGames);
    };

    fetchGames();
  }, [player]);


  return (
    <View>
      <Text> {player?.name} </Text>
        <Text> {filteredGames.length} </Text>
    </View>
  );
};

export default PlayerStatistics;
