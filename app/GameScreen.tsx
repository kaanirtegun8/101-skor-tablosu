import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { theme } from '@/constants/Colors';
import ScoreTable from '@/components/ScoreTable';

const GameScreen = () => {
  const { players, gameMode } = useLocalSearchParams();

  const playerList = Array.isArray(players)
    ? players
    : players
      ? JSON.parse(players)
      : [];

  return (
    <ScrollView style={styles.wrapper}>
      <ScoreTable playerList={playerList} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.background,
    color: theme.colors.onPrimary,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
});

export default GameScreen;