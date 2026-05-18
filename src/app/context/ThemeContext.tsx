import { createContext, useContext, useState, useEffect } from "react";

export type Theme = "blue" | "orange" | "green" | "gradient";

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "blue",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem("site-theme") as Theme) || "blue";
  });

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("theme-orange", "theme-green", "theme-gradient");
    if (theme === "orange")   html.classList.add("theme-orange");
    if (theme === "green")    html.classList.add("theme-green");
    if (theme === "gradient") html.classList.add("theme-gradient");
    localStorage.setItem("site-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
