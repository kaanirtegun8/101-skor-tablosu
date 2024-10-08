import { theme } from "@/constants/Colors";
import useCalculateGameDuration from "@/hooks/useCalculateGameDuration";
import useFormattedDate from "@/hooks/useDateFormat";
import { Game } from "@/hooks/useSaveGame";
import { StyleSheet, ScrollView, View } from "react-native";
import { Card, Text, DataTable } from "react-native-paper";

interface OldGameSummaryProps {
  game: Game;
}

const OldGameSummary = ({ game }: OldGameSummaryProps) => {
  const raundCount = game.scores[game.playerList[0]]?.length || 0;
  const formattedEndTime = game.endTime
    ? useFormattedDate(game.endTime.toString(), "fullDate")
    : "Oyun Tarihi Yok";
  const sortedPlayers = game.playerList.sort(
    (a, b) => game.totalScores[a] - game.totalScores[b]
  );

  const calculateTotal = (values: number[] | undefined) => {
    return values ? values.reduce((acc, value) => acc + value, 0) : 0;
  };

  return (
    <Card style={styles.cardContainer}>
      <Text style={styles.title}>{formattedEndTime}</Text>

        <DataTable style={styles.dataTable}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={styles.fixedColumn}>
              <Text style={styles.tableTitle}>Oyuncular</Text>
            </DataTable.Title>
            <DataTable.Title numeric style={styles.fixedColumn}>
              <Text style={styles.tableTitle}>Skorlar</Text>
            </DataTable.Title>
            <DataTable.Title numeric style={styles.fixedColumn}>
              <Text style={styles.tableTitle}>Ödüller</Text>
            </DataTable.Title>
            <DataTable.Title numeric style={styles.fixedColumn}>
              <Text style={styles.tableTitle}>Cezalar</Text>
            </DataTable.Title>
            <DataTable.Title numeric style={styles.fixedColumn}>
              <Text style={styles.tableTitle}>Toplam Skor</Text>
            </DataTable.Title>
          </DataTable.Header>

          {sortedPlayers.map((player, index) => (
            <DataTable.Row key={index} style={styles.tableRow}>
              <DataTable.Cell style={[styles.tableCell, styles.fixedColumn]}>
                <Text style={styles.tableText}>{player}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric style={[styles.tableCell, styles.fixedColumn]}>
                <Text style={styles.tableText}>{calculateTotal(game.scores[player])}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric style={[styles.tableCell, styles.fixedColumn]}>
                <Text style={styles.tableText}>{calculateTotal(game.prizes[player])}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric style={[styles.tableCell, styles.fixedColumn]}>
                <Text style={styles.tableText}>{calculateTotal(game.penalties[player]) * (-1)}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric style={[styles.tableCell, styles.fixedColumn]}>
                <Text style={styles.tableText}>{game.totalScores[player]}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
        
        <View style={styles.cardFooter}>
          <Text style={styles.cardFooterText} > {raundCount} Tur </Text>
          <Text style={styles.cardFooterText} >Oyun Süresi: {useCalculateGameDuration({startTime: game.startTime, endTime: game.endTime})} </Text>
        </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 12,
    width: "100%",
    alignSelf: "stretch",
    marginBottom: 15,
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 8,
  },
  dataTable: {
    minWidth: "100%",
  },
  tableHeader: {
    backgroundColor: theme.colors.secondary,
    width: "100%",
  },
  tableTitle: {
    fontSize: 9,
    color: "white",
    fontWeight: "bold",
    textAlign: "left",
    justifyContent: "flex-start",
    paddingHorizontal: 12
  },
  tableRow: {
    backgroundColor: "#f9f9f9",
    width: "100%",
  },
  tableCell: {
    textAlign: "left", 
    alignItems: "center",
    fontSize: 12,
  },
  tableText: {
    fontSize: 12, 
  },
  fixedColumn: {
    justifyContent: "flex-start",
  },
  cardFooter: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cardFooterText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default OldGameSummary;