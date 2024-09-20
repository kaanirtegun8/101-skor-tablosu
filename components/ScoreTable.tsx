import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const ScoreTable = ({ playerList }: { playerList: string[] }) => {
  const [scores, setScores] = useState<{ [key: string]: string[] }>({});

  const handleScoreChange = (player: string, round: number, value: string) => {
    setScores((prevScores) => ({
      ...prevScores,
      [player]: prevScores[player]
        ? [...prevScores[player].slice(0, round), value, ...prevScores[player].slice(round + 1)]
        : Array(round).fill('').concat(value),
    }));
  };

  return (
    <View style={styles.scoreTable}>
      {playerList.map((player, index) => (
        <View key={index} style={styles.playerColumn}>
          <Text style={styles.playerName}>{player}</Text>
          {[1, 2, 3, 4, 5].map((round) => (
            <TextInput
              key={round}
              style={styles.input}
              keyboardType="numeric"
              placeholder={`El ${round}`}
              onChangeText={(value) => handleScoreChange(player, round, value)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  scoreTable: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  playerColumn: {
    flex: 1,
    alignItems: 'center',
  },
  playerName: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 4,
    width: 60,
    textAlign: 'center',
  },
});

export default ScoreTable;