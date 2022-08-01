import { ReactNode, useEffect } from "react";
import { createContext, FC, useCallback, useContext } from "react";
import { useLocalStorage } from "@src/hooks/useLocalStorage";

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
  initialColorScheme = "dark",
}) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    value: initialColorScheme,
  });

  const toggleTheme: ColorSchemeContextType["toggleTheme"] = useCallback(
    (scheme) => {
      if (!!scheme) {
        setColorScheme(scheme);
      } else {
        if (colorScheme === "light") {
          setColorScheme("dark");
        } else {
          setColorScheme("light");
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
      colorScheme === "dark"
    );
  }, [colorScheme]);

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
