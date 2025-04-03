import { useState } from "react";
import { Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLang } from "../../context/LangContext";
import '../../assets/scss/components/buttons/_settingsbutton.scss'

const SettingsButton = () => {
     const [open, setOpen] = useState(false);
     const { toggleTheme, theme } = useTheme();
     const { language, toggleLanguage } = useLang();

     return (
          <div className="fixed-settings-button">
               <button className="car-button" onClick={() => setOpen(!open)}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png" alt="" />
               </button>

               <div className={`dropdown-panel ${open ? "open" : ""}`}>
                    <div className="setting-option" onClick={toggleTheme}>
                         {theme === "light" ? <Moon /> : <Sun />}
                         <span key={theme}>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
                    </div>

                    <div className="setting-option" onClick={toggleLanguage}>
                         <Globe />
                         <span>{language === "az" ? "Azərbaycan dili" : "English"}</span>
                    </div>
               </div>

          </div>
     );
};

export default SettingsButton;
