import { theme } from '@/constants/Colors';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Text, Button, RadioButton } from 'react-native-paper';

interface ModeSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectMode: (mode: 'single' | 'team') => void;
}

const ModeSelectionModal = ({ visible, onClose, onSelectMode }: ModeSelectionModalProps) => {
  const [mode, setMode] = useState<'single' | 'team'>('single');

  return (
    <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContent}>
      <Text style={styles.title}>Oyun Modunu Seç</Text>
      <RadioButton.Group onValueChange={value => setMode(value as 'single' | 'team')} value={mode}>
        <View style={styles.radioButton}>
          <RadioButton.Android value="single" />
          <Text>Tekli</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton.Android color={theme.colors.primary} value="team" />
          <Text>Eşli</Text>
        </View>
      </RadioButton.Group>
      <Button mode="contained" onPress={() => onSelectMode(mode)} style={styles.selectButton}>
        Seç
      </Button>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectButton: {
    marginTop: 20,
  },
});

export default ModeSelectionModal;
