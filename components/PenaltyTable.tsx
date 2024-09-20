import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PenaltyTable = ({ playerList }: { playerList: string[] }) => {
  return (
    <View style={styles.penaltyContainer}>
      <Text style={styles.penaltyTitle}>Cezalar</Text>
      {playerList.map((player, index) => (
        <Text key={index} style={styles.penaltyText}>
          {player}: 100 200 150 120 180
        </Text> 
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  penaltyContainer: {
    padding: 16,
    backgroundColor: '#d4a373',
    borderRadius: 8,
    marginVertical: 16,
  },
  penaltyTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  penaltyText: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default PenaltyTable;