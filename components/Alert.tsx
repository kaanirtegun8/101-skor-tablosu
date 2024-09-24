import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";

interface AlertProps {
  message: string;
  visible: boolean;
}

const Alert = ({ message, visible }: AlertProps) => {
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 0, 
          duration: 500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -100, 
          duration: 500,
          delay: 3000,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        translateY.setValue(-100);
      });
    }
  }, [visible, translateY]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.alertContainer,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={styles.alertText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
    elevation: 10,
  },
  alertText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Alert;