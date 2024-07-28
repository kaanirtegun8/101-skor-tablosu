import React, { useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { Button, PaperProvider } from 'react-native-paper';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { theme } from '@/constants/Colors';
import { usePlayers } from '@/hooks/usePlayers';
import { ThemedView } from '@/components/ThemedView';
import PlayerSelectionModal from '@/components/PlayerSelectionModal';
import ModeSelectionModal from '@/components/ModSelectionModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Index = () => {
  const [isModeModalVisible, setModeModalVisible] = useState(false);
  const [isPlayerModalVisible, setPlayerModalVisible] = useState(false);
  const [gameMode, setGameMode] = useState<'single' | 'team'>('single');
  const { players, addPlayer } = usePlayers();
  const [selectedPlayers, setSelectedPlayers] = useState<boolean[]>(new Array(players.length).fill(false));

  const startNewGame = () => {
    setModeModalVisible(true);
  };

  const closeModeModal = () => {
    setModeModalVisible(false);
  };

  const closePlayerModal = () => {
    setPlayerModalVisible(false);
  };

  const onSelectMode = (mode: 'single' | 'team') => {
    setGameMode(mode);
    setModeModalVisible(false);
    setPlayerModalVisible(true);
  };

  const onTogglePlayer = (index: number) => {
    const updatedSelectedPlayers = [...selectedPlayers];
    updatedSelectedPlayers[index] = !updatedSelectedPlayers[index];
    setSelectedPlayers(updatedSelectedPlayers);
  };

  const onStartGame = () => {
    closePlayerModal();
    console.log('Starting game with the following team assignments:', selectedPlayers);
  };

  const handleAddPlayer = (playerName: string) => {
    addPlayer(playerName);
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
        </ParallaxScrollView>

        <ModeSelectionModal
          visible={isModeModalVisible}
          onClose={closeModeModal}
          onSelectMode={onSelectMode}
        />

        <PlayerSelectionModal
          visible={isPlayerModalVisible}
          onClose={closePlayerModal}
          players={players}
          selectedPlayers={selectedPlayers}
          onTogglePlayer={onTogglePlayer}
          onStartGame={onStartGame}
          onAddPlayer={handleAddPlayer}
          gameMode={gameMode}
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
