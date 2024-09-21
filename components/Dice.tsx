import React, { useState, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Animated, ImageSourcePropType } from "react-native";

const DiceComponent = () => {
  const [dice1Image, setDice1Image] = useState(require(`../assets/images/dice-1.webp`));
  const [dice2Image, setDice2Image] = useState(require(`../assets/images/dice-1.webp`));
  const [animation] = useState(new Animated.Value(0));
  const [opacity] = useState(new Animated.Value(0));

  // Referans tutarak interval'leri dışarıda kontrol edebiliriz
  const dice1IntervalRef = useRef<NodeJS.Timeout | null>(null);
  const dice2IntervalRef = useRef<NodeJS.Timeout | null>(null);

  const rollDice = () => {
    // Önceki animasyonlar veya interval'ler varsa temizle
    if (dice1IntervalRef.current) clearInterval(dice1IntervalRef.current);
    if (dice2IntervalRef.current) clearInterval(dice2IntervalRef.current);

    // Zarları dönerken numaraların sürekli değişmesini sağla
    dice1IntervalRef.current = setInterval(() => {
      const randomDice1 = Math.floor(Math.random() * 6) + 1;
      setDice1Image(getDiceImage(randomDice1));
    }, 50);

    dice2IntervalRef.current = setInterval(() => {
      const randomDice2 = Math.floor(Math.random() * 6) + 1;
      setDice2Image(getDiceImage(randomDice2));
    }, 50);

    // Animasyonu başlat
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }), // Zarları görünür yap
      Animated.timing(animation, { toValue: 1440, duration: 3000, useNativeDriver: true }), // Zarları döndür
      Animated.timing(animation, { toValue: 0, duration: 0, useNativeDriver: true }), // Animasyonun sonuna gel
    ]).start(() => {
      // Interval'leri temizle ve zarların son yüzlerini ayarla
      if (dice1IntervalRef.current) clearInterval(dice1IntervalRef.current);
      if (dice2IntervalRef.current) clearInterval(dice2IntervalRef.current);

      const finalDice1 = Math.floor(Math.random() * 6) + 1;
      const finalDice2 = Math.floor(Math.random() * 6) + 1;
      setDice1Image(getDiceImage(finalDice1));
      setDice2Image(getDiceImage(finalDice2));
    });

    // 8 saniye sonra zarların kaybolmasını sağla
    setTimeout(() => {
      Animated.timing(opacity, { toValue: 0, duration: 500, useNativeDriver: true }).start();
    }, 8000);
  };

  const getDiceImage = (num: number): ImageSourcePropType => {
    switch (num) {
      case 1:
        return require("../assets/images/dice-1.webp");
      case 2:
        return require("../assets/images/dice-2.webp");
      case 3:
        return require("../assets/images/dice-3.webp");
      case 4:
        return require("../assets/images/dice-4.webp");
      case 5:
        return require("../assets/images/dice-5.webp");
      case 6:
        return require("../assets/images/dice-6.webp");
      default:
        return require("../assets/images/dice-1.webp");
    }
  };

  const diceRotation = animation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={rollDice}>
        <Animated.Image
          source={dice1Image}
          style={[
            styles.dice,
            { transform: [{ rotate: diceRotation }], opacity: opacity },
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={rollDice}>
        <Animated.Image
          source={dice2Image}
          style={[
            styles.dice,
            { transform: [{ rotate: diceRotation }], opacity: opacity },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  dice: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
});

export default DiceComponent;