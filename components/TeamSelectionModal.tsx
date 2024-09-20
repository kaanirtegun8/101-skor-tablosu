import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, Card, Checkbox, Modal } from 'react-native-paper';
import { Player } from '@/hooks/usePlayers';
import { ThemedText } from './ThemedText';

interface TeamSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  players: Player[];
  onSaveTeams: (team1: Player[], team2: Player[]) => void;
}

const TeamSelectionModal = ({ visible, onClose, players, onSaveTeams }: TeamSelectionModalProps) => {
  const [unassignedPlayers, setUnassignedPlayers] = useState<Player[]>([]);
  const [team1, setTeam1] = useState<Player[]>([]);
  const [team2, setTeam2] = useState<Player[]>([]);

  useEffect(() => {
    setUnassignedPlayers(players);
  }, [players]);

  const handleCheckboxChange = (player: Player, team: 'team1' | 'team2') => {
    if (team === 'team1') {
      setTeam2((prev) => prev.filter((p) => p.id !== player.id));
      setTeam1((prev) => {
        if (prev.includes(player)) {
          return prev.filter((p) => p.id !== player.id);
        } else {
          return [...prev, player];
        }
      });
    } else {
      setTeam1((prev) => prev.filter((p) => p.id !== player.id));
      setTeam2((prev) => {
        if (prev.includes(player)) {
          return prev.filter((p) => p.id !== player.id);
        } else {
          return [...prev, player];
        }
      });
    }
  };

  const validateTeams = () => {
    if (team1.length < 2 || team2.length < 2) {
      Alert.alert('Uyarı', 'Her takımda en az 2 oyuncu olmalıdır.');
    } else {
      onSaveTeams(team1, team2);
    }
  };

  const getPlayerPositionStyle = (player: Player) => {
    if (team1.includes(player)) {
      return styles.playerLeft;
    } else if (team2.includes(player)) {
      return styles.playerRight;
    } else {
      return styles.playerCenter;
    }
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      contentContainerStyle={styles.modalContent}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Takımları Seç</Text>
        <ScrollView>
          {unassignedPlayers.map((player) => (
            <Card key={player.id} style={styles.card}>
              <View style={styles.cardContent}>
                <ThemedText type='subtitle' style={getPlayerPositionStyle(player)}>
                  {player.name}
                </ThemedText>
                <View style={styles.checkboxContainer}>
                  <View style={styles.checkbox}>
                    <Checkbox.Android
                      status={team1.includes(player) ? 'checked' : 'unchecked'}
                      onPress={() => handleCheckboxChange(player, 'team1')}
                    />
                    <Text>Takım 1</Text>
                  </View>
                  <View style={styles.checkbox}>
                    <Checkbox.Android
                      status={team2.includes(player) ? 'checked' : 'unchecked'}
                      onPress={() => handleCheckboxChange(player, 'team2')}
                    />
                    <Text>Takım 2</Text>
                  </View>
                </View>
              </View>
            </Card>
          ))}
        </ScrollView>
        <Button mode="contained" onPress={validateTeams} style={styles.saveButton}>
          Takımları Kaydet
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    padding: 10,
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerLeft: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: '100%',
  },
  playerCenter: {
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  playerRight: {
    textAlign: 'right',
    alignSelf: 'flex-end',
    width: '100%',
  },
  saveButton: {
    marginTop: 20,
  },
});

export default TeamSelectionModal;
