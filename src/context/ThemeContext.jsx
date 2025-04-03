import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

// eslint-disable-next-line react/prop-types
export const ThemeProvider = ({ children }) => {
     const [theme, setTheme] = useState("light");

     const toggleTheme = () => {
          const newTheme = theme === "light" ? "dark" : "light";
          setTheme(newTheme);
          document.documentElement.setAttribute("data-theme", newTheme);
     };

     useEffect(() => {
          document.documentElement.setAttribute("data-theme", theme);
     }, [theme]);

     return (
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
               {children}
          </ThemeContext.Provider>
     );
};

export const useTheme = () => useContext(ThemeContext);
