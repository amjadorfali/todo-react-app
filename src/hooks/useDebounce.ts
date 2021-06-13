import React from "react";

export default function useDebounce(start: boolean, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = React.useState(false);

  React.useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebouncedValue(start);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [start, delay]);

  return debouncedValue;
}
