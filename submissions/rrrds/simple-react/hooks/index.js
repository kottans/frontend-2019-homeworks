import { useEffect, useState } from "react";

export function useDebounce(value, timeout) {
  const [debValue, setDebValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebValue(value);
    }, timeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);

  return debValue;
}
