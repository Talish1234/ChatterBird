import { useState, useEffect } from "react";

// Custom hook for debouncing values
export  function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler); // cleanup old timer
  }, [value, delay]);

  return debouncedValue;
}
