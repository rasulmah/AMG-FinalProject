import 'react';
import MagneticButton from './Buttons/MagneticButton';
import StaticLang from '../utils/StaticLang';
import '../assets/scss/components/AboutDriverCardSec.scss';

const AboutDriverCardSec = () => {
  return (
    <div className='section-cont d-flex flex-column justify-content-center align-items-center'>
      <div className="media-cont d-flex flex-column text-center justify-content-center align-items-center gap-2">
        <h3 className='text-light'>
          <StaticLang en="Season Team Driver Cards" az="Mövsüm Komanda Sürücü Kartları" />
        </h3>
        <p className='text-light'>
          <StaticLang
            en="Register your interest today, to get on the list and be the first to receive Team Driver Cards for the Season. Simply sign up to our marketing newsletter using the form below, let us know your favourite driver, and await the arrival of the printed Team Driver Cards on your doorstep. Please note that due to the high demand for Driver cards, we are unable to fulfil every request."
            az="Mövsüm üçün Komanda Sürücü Kartlarını ilk alanlardan olmaq üçün bu gün qeydiyyatdan keçin. Aşağıdakı formadan marketinq bülletenimizə abunə olun, sevimli sürücünüzü bizə bildirin və çap olunmuş kartların qapınıza gəlməsini gözləyin. Nəzərə alın ki, yüksək tələbat səbəbindən bütün müraciətləri qarşılamaq mümkün deyil."
          />
        </p>
        <MagneticButton
          text={
            <StaticLang en="Get Your Driver Card" az="Sürücü Kartınızı Əldə Edin" />
          }
        />
      </div>
    </div>
  );
};

export default AboutDriverCardSec;
