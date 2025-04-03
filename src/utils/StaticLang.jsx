import { useLang } from '../context/LangContext';

// eslint-disable-next-line react/prop-types
const StaticLang = ({ en, az }) => {
     const { language } = useLang();

     return <>{language === 'az' ? az : en}</>;
};

export default StaticLang;
