import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

interface ThemeContextProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export default function ThemeContextProvider({ children }: ThemeContextProviderProps): JSX.Element {
  const [theme, setTheme] = useState(localStorage.getItem("theme") !== "dark" ? "light" : "dark");

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextProps {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return context;
}
