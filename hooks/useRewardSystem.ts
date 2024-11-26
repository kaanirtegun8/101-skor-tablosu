import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useRewardSystem = () => {
  const [isRewardSystemEnabled, setIsRewardSystemEnabled] = useState(true);

  useEffect(() => {
    const loadRewardSetting = async () => {
      const storedValue = await AsyncStorage.getItem("rewardSystem");
      if (storedValue !== null) {
        setIsRewardSystemEnabled(JSON.parse(storedValue));
      }
    };
    loadRewardSetting();
  }, []);

  const toggleRewardSystem = async () => {
    const newValue = !isRewardSystemEnabled;
    setIsRewardSystemEnabled(newValue);
    await AsyncStorage.setItem("rewardSystem", JSON.stringify(newValue));
  };

  return { isRewardSystemEnabled, toggleRewardSystem };
};

export default useRewardSystem;