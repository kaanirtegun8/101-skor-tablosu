import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Switch, Divider } from "react-native-paper";
import useRewardSystem from "../hooks/useRewardSystem";
import useDiceSystem from "../hooks/useDiceSystem";

const Settings = () => {
  const { isRewardSystemEnabled, toggleRewardSystem } = useRewardSystem();
  const { isDiceSystemEnabled, toggleDiceSystem } = useDiceSystem();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ayarlar</Text>
      
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Ödül Sistemi</Text>
        <Switch
          value={isRewardSystemEnabled}
          onValueChange={toggleRewardSystem}
        />
      </View>
      <Divider style={styles.divider} />
      
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Zar Sistemi</Text>
        <Switch
          value={isDiceSystemEnabled}
          onValueChange={toggleDiceSystem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingLabel: {
    fontSize: 18,
    color: "#555",
  },
  divider: {
    marginVertical: 10,
    backgroundColor: "#ddd",
    height: 1,
  },
});

export default Settings;