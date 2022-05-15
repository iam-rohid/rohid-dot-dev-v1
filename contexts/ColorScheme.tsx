import { ReactNode, useEffect, useMemo } from "react";
import { createContext, FC, useCallback, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useMediaQuery from "../hooks/useMediaQuery";

export type ColorScheme = "light" | "dark";

export type ColorSchemeContextType = {
  colorScheme: ColorScheme;
  toggleTheme: (scheme?: ColorScheme) => void;
};
export const ColorSchemeContext = createContext<ColorSchemeContextType | null>(
  null
);

export type ColorSchemeProps = {
  children: ReactNode;
  initialColorScheme?: ColorScheme;
};

export const ColorSchemeProvider: FC<ColorSchemeProps> = ({
  children,
  initialColorScheme,
}) => {
  const [colorScheme, setColorScheme] = useLocalStorage<string>({
    key: "color-scheme",
    value: "system",
  });

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const toggleTheme: ColorSchemeContextType["toggleTheme"] = useCallback(
    (scheme) => {
      if (scheme) {
        setColorScheme(scheme);
      } else {
        switch (colorScheme) {
          case "system":
            setColorScheme(prefersDarkMode ? "light" : "dark");
            break;
          case "light":
            setColorScheme("dark");
            break;
          case "dark":
            setColorScheme("light");
            break;
        }
      }
    },
    [colorScheme, setColorScheme, prefersDarkMode]
  );

  const getColorScheme = useMemo(
    () =>
      colorScheme === "system"
        ? prefersDarkMode
          ? "dark"
          : "light"
        : (colorScheme as ColorScheme),
    [colorScheme, prefersDarkMode]
  );

  const value: ColorSchemeContextType = {
    colorScheme: getColorScheme,
    toggleTheme,
  };

  useEffect(() => {
    if (!colorScheme) {
      setColorScheme(
        initialColorScheme
          ? initialColorScheme
          : prefersDarkMode
          ? "dark"
          : "light"
      );
    }
  }, [colorScheme, initialColorScheme, prefersDarkMode, setColorScheme]);

  useEffect(() => {
    window.document.documentElement.classList.toggle(
      "dark",
      getColorScheme === "dark"
    );
  }, [getColorScheme, prefersDarkMode]);

  return (
    <ColorSchemeContext.Provider value={value}>
      {children}
    </ColorSchemeContext.Provider>
  );
};

export const useColorScheme = () => {
  const context = useContext(ColorSchemeContext);
  if (!context)
    throw new Error("useColorScheme must be used within a ColorSchemeProvider");
  return context;
};
