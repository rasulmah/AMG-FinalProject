import 'react';
import MagneticButton from "../components/Buttons/MagneticButton";
import '../assets/scss/pages/_notFoundPage.scss';
import SubscribeSec from '../components/SectionComponents/SubscribeSec';
import TrendingSlider from '../components/Sliders/TrendingSlider';
import StaticLang from '../utils/StaticLang';

const NotFoundPage = () => {
  return (
    <>
      <div className='text-light img-container'>
        <p className='text'>404</p>
        <h2 className='h2 mb-4'>
          <StaticLang
            en="Sorry, we couldn't find that!"
            az="Bağışlayın, bu səhifəni tapa bilmədik!"
          />
        </h2>
        <div className="button">
          <MagneticButton
            text={
              <StaticLang
                en="Continue Shopping"
                az="Alış-verişə Davam Et"
              />
            }
          />
        </div>
      </div>

      <div className="trending-body py-5">
        <h1 className='text-light text-center pb-5'>
          <StaticLang
            en="Look! what is trending now..."
            az="Bax! Hazırda trenddə olanlar..."
          />
        </h1>
        <TrendingSlider />
      </div>

      <section className="subscribe d-flex justify-content-between align-items-center flex-column">
        <SubscribeSec />
      </section>
    </>
  );
};

export default NotFoundPage;
