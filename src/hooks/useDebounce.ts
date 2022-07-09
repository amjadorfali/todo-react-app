import React, { useState } from 'react';

export default function useDebounce<T>(value: T, delay = 500): { debouncedValue: T; isDebouncing: boolean } {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isDebouncing, setIsDebouncing] = useState(false);

  React.useEffect(() => {
    setIsDebouncing(true);
    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return { debouncedValue, isDebouncing };
}
