import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Checkbox, Text } from 'react-native-paper';
import { Player } from '@/hooks/usePlayers';
import { theme } from '@/constants/Colors';
import { MAX_PLAYER_COUNT, MIN_PLAYER_COUNT } from '@/constants/GameRules';

interface PlayerListProps {
  players: Player[];
  selectedPlayers: boolean[];
  onTogglePlayer: (index: number) => void;
}

const PlayerList = ({ players, selectedPlayers, onTogglePlayer }: PlayerListProps) => {
  const selectedCount = selectedPlayers.filter(Boolean).length;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          <TouchableOpacity activeOpacity={1}>
            {players.length === 0 ? (
              <Text>Oyuncu bulunamadı.</Text>
            ) : (
              players.map((player, index) => (
                <View key={index.toString()} style={styles.playerRow}>
                  <Text style={styles.playerName}>{player.name}</Text>
                  <Checkbox.Android
                    color={theme.colors.primary}
                    status={selectedPlayers[index] ? 'checked' : 'unchecked'}
                    onPress={() => onTogglePlayer(index)}
                    uncheckedColor={theme.colors.secondary}
                    disabled={!selectedPlayers[index] && selectedCount === MAX_PLAYER_COUNT} 
                  />
                </View>
              ))
            )}
          </TouchableOpacity>
        </ScrollView>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    maxHeight: 300,
  },
  scrollViewContent: {
    paddingBottom: 10,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  playerName: {
    fontSize: 18,
  },
});

export default PlayerList;
