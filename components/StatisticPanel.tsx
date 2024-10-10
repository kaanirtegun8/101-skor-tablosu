import { theme } from "@/constants/Colors";
import { PlayerStatistic } from "@/hooks/useStatistic";
import React from "react";
import { View, Text, FlatList, StyleSheet, ListRenderItem } from "react-native";
import { Button } from "react-native-paper";

interface StatisticPanelProps {
  data: PlayerStatistic[];
  title: string;
}

const StatisticPanel = ({data, title}: StatisticPanelProps) => {
  const renderItem: ListRenderItem<PlayerStatistic> = ({ item, index }) => (
    <View
      style={[
        styles.itemContainer,
        { backgroundColor: index % 2 === 0 ? "#525252" : "#3C3C3C" },
      ]}
    >
      <Text style={styles.itemText}>
        {index + 1}. {item.playerName}
      </Text>
      <Text style={styles.itemPoints}>{item.score}</Text>
    </View>
  );

  const handleShowAllPress = () => {
    console.log("Tümünü göster butonuna basıldı!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}>{title}</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.playerName}
      />

      <View style={styles.footer}>
        <Button
          onPress={handleShowAllPress}
          textColor="white"
          contentStyle={styles.buttonContentStyle}
          icon={"plus"}
        >
          Tümünü Göster
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#303C49",
    borderRadius: 12,
    width: "100%",
    alignSelf: "center",
    marginBottom: 20,
  },
  header: {
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
    backgroundColor: theme.colors.secondary,
  },
  titleText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 10,
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemText: {
    color: "white",
    fontSize: 14,
  },
  itemPoints: {
    color: "white",
    fontSize: 14,
  },
  footer: {
    backgroundColor: theme.colors.secondary,
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
  },
  buttonContentStyle: {
    direction: "rtl",
  },
});

export default StatisticPanel;
