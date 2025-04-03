import { createContext, useContext, useEffect, useState } from "react";

const LangContext = createContext();

// eslint-disable-next-line react/prop-types
export const LangProvider = ({ children }) => {
     const [language, setLanguage] = useState(() => {
          return localStorage.getItem("lang") || "en";
     });

     const toggleLanguage = () => {
          setLanguage((prev) => (prev === "en" ? "az" : "en"));
     };

     useEffect(() => {
          localStorage.setItem("lang", language);
     }, [language]);

     return (
          <LangContext.Provider value={{ language, toggleLanguage }}>
               {children}
          </LangContext.Provider>
     );
};

export const useLang = () => useContext(LangContext);

