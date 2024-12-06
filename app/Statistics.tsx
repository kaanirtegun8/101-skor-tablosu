import GameStatistics from "@/components/GameStatistics";
import IndividualStatistics from "@/components/IndividualStatistics";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Divider } from "react-native-paper";

type Tab = "game" | "individual";

const Statistics = () => {
  const [activeTab, setActiveTab] = useState<Tab>("game");

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          mode="text"
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={{ color: activeTab === "game" ? "#FFA500" : "black" }}
          onPress={() => setActiveTab("game")}
        >
          Oyun
        </Button>

        <Divider style={styles.divider} />

        <Button
          mode="text"
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={{
            color: activeTab === "individual" ? "#FFA500" : "black",
          }}
          onPress={() => setActiveTab("individual")}
        >
          Bireysel
        </Button>
      </View>

      {activeTab === "game" ? <GameStatistics /> : <IndividualStatistics />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f0d9f9",
    padding: 0,
  },
  button: {
    flex: 1,  
    justifyContent: "center", 
    alignItems: "center", 
  },
  buttonContent: {
    paddingVertical: 10, 
    paddingHorizontal: 40, 
  },
  divider: {
    width: 2,
    backgroundColor: "white",
    height: "100%",
  },
});

export default Statistics;
