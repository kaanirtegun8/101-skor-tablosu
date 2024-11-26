import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useDiceSystem = () => {
  const [isDiceSystemEnabled, setIsDiceSystemEnabled] = useState(true);

  useEffect(() => {
    const loadDiceSetting = async () => {
      const storedValue = await AsyncStorage.getItem("diceSystem");
      if (storedValue !== null) {
        setIsDiceSystemEnabled(JSON.parse(storedValue));
      }
    };
    loadDiceSetting();
  }, []);

  const toggleDiceSystem = async () => {
    const newValue = !isDiceSystemEnabled;
    setIsDiceSystemEnabled(newValue);
    await AsyncStorage.setItem("diceSystem", JSON.stringify(newValue));
  };

  return { isDiceSystemEnabled, toggleDiceSystem };
};

export default useDiceSystem;