import { useEffect, useState } from "react";

export type UseLocalStorageProps<T> = {
  key: string;
  value: T;
};

export type UseLocalStorageReturn<T> = [
  state: T,
  setState: (newState: T) => void
];

export function useLocalStorage<T>({
  key,
  value,
}: UseLocalStorageProps<T>): UseLocalStorageReturn<T> {
  const [state, setState] = useState<T>(value);

  useEffect(() => {
    const lsstate = localStorage.getItem(key);
    setState(lsstate ? JSON.parse(JSON.stringify(lsstate)) : value);
  }, [key, value]);

  const onStateChange = (newState: T) => {
    setState(newState);
    localStorage.setItem(key, JSON.parse(JSON.stringify(newState)));
  };
  return [state, onStateChange];
}
