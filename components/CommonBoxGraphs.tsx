import { LinearGradient, useFont, vec } from "@shopify/react-native-skia";
import { Bar, CartesianChart } from "victory-native";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface TotalScoresGraphsProps {
  data: {
    x: number;
    y: number;
  }[];
  title: string;
}

const CommonBoxGraphs = ({ data, title }: TotalScoresGraphsProps) => {
  const font = useFont(require("../assets/fonts/SpaceMono-Regular.ttf"));

  return (
    <View style={styles.container}>
      <Text style={styles.title}> {title}</Text>

      <CartesianChart
        data={data}
        xKey="x"
        yKeys={["y"]}
        domainPadding={{ left: 50, right: 50, top: 10, bottom: 10 }}
        axisOptions={{
          font,
          tickCount: 8,
        }}
      >
        {({ points, chartBounds }) => (
          <Bar
            chartBounds={chartBounds}
            points={points.y}
            innerPadding={0.9}
            barCount={data.length}
            barWidth={100 / data.length}
            roundedCorners={{
              topLeft: 2,
              topRight: 2,
            }}
            animate={{
              type: "spring",
              damping: 50,
              stiffness: 300,
              mass: 2,
              overshootClamping: true,
              restSpeedThreshold: 0.001,
              restDisplacementThreshold: 0.001,
            }}
          >
            <LinearGradient
              start={vec(0, 0)}
              end={vec(0, 400)}
              colors={["#a78bfa", "#f0d9f9"]}
            />
          </Bar>
        )}
      </CartesianChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    padding: 12,
    backgroundColor: "white",
    marginVertical: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default CommonBoxGraphs;
