import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { Button, PaperProvider } from 'react-native-paper';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { theme } from '@/constants/Colors';
import { Player, usePlayers } from '@/hooks/usePlayers';
import { ThemedView } from '@/components/ThemedView';
import PlayerSelectionModal from '@/components/PlayerSelectionModal';
import ModeSelectionModal from '@/components/ModeSelectionModal';
import TeamSelectionModal from '@/components/TeamSelectionModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { useSaveGame } from '@/hooks/useSaveGame';

const Index = () => {
  const [activeModal, setActiveModal] = useState<'none' | 'mode' | 'player' | 'team'>('none');
  const [gameMode, setGameMode] = useState<'single' | 'team'>('single');
  const { players, addPlayer } = usePlayers();
  const {game} = useSaveGame();
  const [selectedPlayers, setSelectedPlayers] = useState<boolean[]>(new Array(players.length).fill(false));
  const [selectedTeamPlayers, setSelectedTeamPlayers] = useState<Player[]>([]);

  const router = useRouter();

  useEffect(() => {
    setSelectedPlayers(new Array(players.length).fill(false));
  }, [players]);

  const startNewGame = () => {
    setActiveModal('mode');
  };

  const closeModeModal = () => {
    setActiveModal('none');
  };

  const closePlayerModal = () => {
    setActiveModal('none');
  };

  const closeTeamModal = () => {
    setActiveModal('none');
  };

  const onSelectMode = (mode: 'single' | 'team') => {
    setGameMode(mode);
    setActiveModal('player');
  };

  const onTogglePlayer = (index: number) => {
    const updatedSelectedPlayers = [...selectedPlayers];
    updatedSelectedPlayers[index] = !updatedSelectedPlayers[index];
    setSelectedPlayers(updatedSelectedPlayers);
  };

  const onStartGame = () => {
    closePlayerModal();
    const selectedPlayerNames = players
      .filter((_, index) => selectedPlayers[index])
      .map((player) => player.name);

    router.push({
      pathname: 'GameScreen',
      params: {
        players: JSON.stringify(selectedPlayerNames), 
        gameMode,
      },
    });
  };

  const continueLastGame = () => {
    if (game) {
      router.push({
        pathname: "GameScreen",
        params: {
          players: JSON.stringify(game.playerList),
          scores: JSON.stringify(game.scores),
          prizes: JSON.stringify(game.prizes),
          penalties: JSON.stringify(game.penalties),
          totalScores: JSON.stringify(game.totalScores),
          isContinuing: 'true',
        },
      });
    } else {
      console.log("No saved game found");
    }
  };
  
  
  

  const handleAddPlayer = (playerName: string) => {
    addPlayer(playerName);
  };

  const onSelectTeams = () => {
    const selectedTeamPlayers = players.filter((_, index) => selectedPlayers[index]);
    setSelectedTeamPlayers(selectedTeamPlayers);
    setActiveModal('team');
  };

  const onSaveTeams = (team1: Player[], team2: Player[]) => {
    closeTeamModal();
    console.log('Team 1:', team1);
    console.log('Team 2:', team2);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <ParallaxScrollView
          headerImage={<ImageBackground source={require('../assets/images/okey.jpg')} style={styles.headerImage} />}
          headerBackgroundColor={{ dark: '#1a1a1a', light: theme.colors.surface }}
        >
          <ThemedView style={styles.container}>
            <Button mode="contained" onPress={startNewGame} style={styles.button}>
              Yeni Oyuna Başla
            </Button>
          </ThemedView>

          <ThemedView style={styles.container}>
            <Button mode="contained" onPress={continueLastGame} style={styles.button}>
              Son Oyuna Devam Et
            </Button>
          </ThemedView>
        </ParallaxScrollView>

        <ModeSelectionModal
          visible={activeModal === 'mode'}
          onClose={closeModeModal}
          onSelectMode={onSelectMode}
        />

        <PlayerSelectionModal
          visible={activeModal === 'player'}
          onClose={closePlayerModal}
          players={players}
          selectedPlayers={selectedPlayers}
          onTogglePlayer={onTogglePlayer}
          onStartGame={onStartGame}
          onAddPlayer={handleAddPlayer}
          onSelectTeams={onSelectTeams}
          gameMode={gameMode}
        />

        <TeamSelectionModal
          visible={activeModal === 'team'}
          onClose={closeTeamModal}
          players={selectedTeamPlayers}
          onSaveTeams={onSaveTeams}
        />
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
    backgroundColor: theme.colors.background,
  },
  headerImage: {
    width: '100%',
    height: 200,
  },
  button: {
    marginVertical: 8,
    borderRadius: 15,
  },
});

export default Index;
