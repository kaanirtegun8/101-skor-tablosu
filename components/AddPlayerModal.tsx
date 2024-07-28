import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import Modal from 'react-native-modal';

interface AddPlayerModalProps {
    visible: boolean;
    onClose: () => void;
    onAddPlayer: (playerName: string) => void;
}

const AddPlayerModal = ({ visible, onClose, onAddPlayer }: AddPlayerModalProps) => {
    const [playerName, setPlayerName] = useState('');

    const handleAddPlayer = () => {
        if (playerName.trim()) {
            onAddPlayer(playerName.trim());
            setPlayerName('');
            onClose();
        }
    };

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onClose}
            style={styles.addModal}
            swipeDirection="down"
            onSwipeComplete={onClose}
        >
            <View style={styles.addContent}>
                <View style={styles.addHeader}>
                    <Text style={styles.addTitle}>Oyuncu Ekle</Text>
                    <IconButton icon="close" onPress={onClose} />
                </View>
                <TextInput
                    style={styles.addInput}
                    placeholder="Oyuncu İsmi"
                    value={playerName}
                    onChangeText={setPlayerName}
                />
                <Button mode="contained" onPress={handleAddPlayer} style={styles.addAddButton}>
                    Ekle
                </Button>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    addModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    addContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    addHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    addTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    addInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    addAddButton: {
        marginTop: 40,
        marginBottom: 10,
    },
});

export default AddPlayerModal;
