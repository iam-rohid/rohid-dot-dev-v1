import { ReactNode, useEffect } from "react";
import { createContext, FC, useCallback, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useMediaQuery from "../hooks/useMediaQuery";

export type ColorScheme = "light" | "dark" | "system";

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
  initialColorScheme = "system",
}) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    value: initialColorScheme,
  });

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const toggleTheme: ColorSchemeContextType["toggleTheme"] = useCallback(
    (scheme) => {
      if (scheme) {
        setColorScheme(scheme);
      } else {
        switch (scheme || colorScheme) {
          case "system":
            setColorScheme("light");
            break;
          case "light":
            setColorScheme("dark");
            break;
          case "dark":
            setColorScheme("system");
            break;
          default:
            setColorScheme("system");
            break;
        }
      }
    },
    [colorScheme, setColorScheme]
  );

  const value: ColorSchemeContextType = {
    colorScheme,
    toggleTheme,
  };

  useEffect(() => {
    window.document.documentElement.classList.toggle(
      "dark",
      colorScheme === "dark" || (colorScheme === "system" && prefersDarkMode)
    );
  }, [colorScheme, prefersDarkMode]);

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
