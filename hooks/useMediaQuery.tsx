import { useCallback, useEffect, useState } from "react";

const useMediaQuery = (
  query: string,
  onChange?: (event: MediaQueryListEvent) => void
) => {
  const [state, setState] = useState(false);

  const onMediaChange = useCallback(
    (ev: MediaQueryListEvent) => {
      setState(ev.matches);
      onChange && onChange(ev);
    },
    [onChange]
  );

  useEffect(() => {
    if (typeof window !== undefined) {
      setState(window?.matchMedia(query).matches);
    }
  }, [query]);

  useEffect(() => {
    const media = window.matchMedia(query);
    media.addEventListener("change", onMediaChange);
    return () => {
      media.removeEventListener("change", onMediaChange);
    };
  }, [onMediaChange, query]);

  return state;
};

export default useMediaQuery;
