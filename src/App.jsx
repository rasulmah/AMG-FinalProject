import { useLocation } from "react-router-dom";
import './assets/scss/styles.scss';
import Header from './layout/Header';
import Footer from './layout/Footer';
import RouterConfig from './config/RouterConfig';
import Loading from './components/Loading';

import './assets/scss/abstracts/_mobile.scss';
import SettingsButton from "./components/Buttons/SettingsButton";
import { LangProvider } from "./context/LangContext";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  const location = useLocation();

  const shouldHideFooter = ['/login', '/signup', '/account', '/dashboard', '/dashboard/dashboard-products', '/dashboard/website-preview', '/checkout'].includes(location.pathname);
  const hideHeader = ['/dashboard', '/checkout'].includes(location.pathname);


  return (
    <>
      <LangProvider>
        <ThemeProvider>
          <Loading />
          {!hideHeader && <Header />}
          <RouterConfig />
          <SettingsButton></SettingsButton>
          {!shouldHideFooter && <Footer />}
        </ThemeProvider>
      </LangProvider>
    </>
  );
}

export default App;

