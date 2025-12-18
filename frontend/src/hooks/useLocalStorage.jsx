
import { useEffect, useState } from "react";

// Custom Hook for storing favorites in Local Storage
export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // fail silently 
    }
  }, [key, value]);

  return [value, setValue];
}
