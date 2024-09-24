import { useState, useEffect } from "react";

export const useAlert = () => {
  const [alert, setAlert] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showAlert = (message: string, duration = 3000) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setAlert({ message, visible: true });

    const newTimeoutId = setTimeout(() => {
      hideAlert();
    }, duration);

    setTimeoutId(newTimeoutId); 
  };

  const hideAlert = () => {
    setAlert({ message: "", visible: false });

    if (timeoutId) {
      clearTimeout(timeoutId); 
      setTimeoutId(null);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return { alert, showAlert, hideAlert };
};