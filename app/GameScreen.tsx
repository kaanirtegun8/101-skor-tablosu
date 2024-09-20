import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { theme } from '@/constants/Colors';
import ScoreTable from '@/components/ScoreTable';
import PenaltyTable from '@/components/PenaltyTable';
import { AddScoreModal } from '@/components/AddScoreModal';

const GameScreen = () => {
  const { players, gameMode } = useLocalSearchParams();
  const [isModalVisible, setModalVisible] = useState(false);
  const [scores, setScores] = useState<{ [key: string]: number[] }>({});

  const handleAddScore = (playerName: string, score: number) => {
    setScores((prevScores) => {
      const playerScores = prevScores[playerName] || [];
      return {
        ...prevScores,
        [playerName]: [...playerScores, score],
      };
    });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const playerList = Array.isArray(players)
    ? players
    : players
      ? JSON.parse(players)
      : [];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.wrapper}>
        <ScoreTable playerList={playerList} scores={scores} />
        <PenaltyTable playerList={playerList} />
      </ScrollView>

      <TouchableOpacity onPress={toggleModal} style={styles.addScoreButton}>
        <Text style={styles.addScoreButtonText}>Yeni El Skoru Gir</Text>
      </TouchableOpacity>

      <AddScoreModal
        onAddScore={handleAddScore}
        onClose={toggleModal}
        playerList={playerList}
        visible={isModalVisible}
        rountCount={scores[playerList[0]]?.length + 1 || 1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.background,
    color: theme.colors.onPrimary,
    padding: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  addScoreButton: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 20,
  },
  addScoreButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default GameScreen;