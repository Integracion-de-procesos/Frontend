import React, { createContext, useState, useContext, ReactNode } from "react";
import { Theme } from "../types/theme.interface";
import { lightTheme, darkTheme } from "../styles/theme.styles";

// se admite como propiedad una funcion flecha
interface ThemeContextProps {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void; 
}

// Componente PRINCIPAL ThemeContext
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

/* 
    Dado que el tema va ser global debee envolver todos los elementos de React, Vistas, Botones, etc.
    Dichos elementos generalizan con el tipo ReactNode
*/
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps): React.JSX.Element => {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((prev) => !prev);
  const theme: Theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// funcion para acceder a las props de ThemeContext
// Retornamos las props de ThemeContextProps {theme, isDark, toggleTheme()}
export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("error: contexto de tema");
  }
  return context;
};
