import { useRef, useState } from 'react';
import '../assets/scss/pages/_about.scss';
import MyVideo from '../assets/videos/My Video-1.mp4';
import SectionHeader from '../components/SectionComponents/SectionHeader';
import CollectionSlider from '../components/Sliders/CollectionSlider';
import AboutDriverCardSec from '../components/AboutDriverCardSec';
import DriversSlider from '../components/Sliders/DriversSlider';
import TrendingSlider from '../components/Sliders/TrendingSlider';
import MagneticButton from '../components/Buttons/MagneticButton';
import SubscribeSec from '../components/SectionComponents/SubscribeSec';
import FeatureSlider from '../components/Sliders/FeatureSlider';
import StaticLang from '../utils/StaticLang';

const About = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className='about'>
      <div className="myVideo">
        <video ref={videoRef} autoPlay loop muted>
          <source src={MyVideo} type="video/mp4" />
        </video>

        <button className="mute-btn" onClick={toggleMute}>
          <i className={isMuted ? "fas fa-volume-mute" : "fas fa-volume-up"}></i>
        </button>

        <div className='about-title d-flex flex-column gap-3'>
          <div>
            <h1 className='about-title-heading'>
              <StaticLang en="About" az="Haqqımızda" />
            </h1>
            <p className='about-title-text'>
              Mercedes AMG Petronas <span className='italic-text'>F1 Team</span>
            </p>
          </div>

          <a href="#about-main" className="learn-more">
            <StaticLang en="Learn More" az="Daha Ətraflı" />
          </a>
        </div>
      </div>

      <div id="about-main">
        <h3 className='about-main-heading d-flex justify-content-center align-items-center'>
          <StaticLang
            en="Mercedes-AMG PETRONAS Formula One Team is the works team of Mercedes-AMG, competing at the pinnacle of motorsport – the FIA Formula One™ World Championship."
            az="Mercedes-AMG PETRONAS Formula One Team, Mercedes-AMG-nin rəsmi komandasıdır və FIA Formula One™ Dünya Çempionatında ən yüksək səviyyədə yarışır."
          />
        </h3>

        <div className="about-container">
          <SectionHeader
            h1={<StaticLang en="The Team" az="Komanda" />}
            h2={<StaticLang en="Our History" az="Tariximiz" />}
          />

          <h2 className="title">
            <StaticLang en="The Silver Arrows" az="Gümüş Oxlar" />
          </h2>

          <div className="grid-container">
            <p>
              <StaticLang
                en="Formula One is a sport like no other. Combining elite teamwork, cutting-edge technologies and innovation, high-performance management and exceptional driving skill, teams develop race cars capable of competing against their rivals in a high-octane environment that spans upwards of 20 races across five continents throughout each season."
                az="Formula 1 bənzərsiz bir idmandır. Ən yüksək səviyyəli komanda işi, qabaqcıl texnologiya, performans idarəçiliyi və sürücülük bacarığı bir araya gələrək komandalar mövsüm boyunca 5 qitədə 20-dən çox yarışda rəqabət aparan bolidlər hazırlayır."
              />
            </p>
            <p>
              <StaticLang
                en="Winning seven consecutive double Drivers’ and Constructors’ World Championships from 2014 to 2020 and securing a record-breaking eighth consecutive Constructors’ Championship success in 2021, the Team is one of the most successful in the sport’s history."
                az="2014-dən 2020-yə kimi ardıcıl yeddi dəfə həm sürücülər, həm də istehsalçılar çempionluğunu qazanan və 2021-də rekord səviyyədə səkkizinci çempionluğu əldə edən komanda idman tarixinin ən uğurlularındandır."
              />
            </p>
            <p>
              <StaticLang
                en="The Mercedes-AMG PETRONAS Formula One Team, based across Technology Centres at Brackley and Brixworth in the United Kingdom, brings together over 1,000 dedicated and determined people that design, develop, manufacture and race the cars driven by Kimi Antonelli and George Russell."
                az="Mercedes-AMG PETRONAS Formula One Team, Böyük Britaniyada yerləşən Brackley və Brixworth texnologiya mərkəzlərində fəaliyyət göstərir və Kimi Antonelli və George Russell-in sürdüyü avtomobilləri dizayn edən, inkişaf etdirən və istehsal edən 1000-dən çox peşəkarı bir araya gətirir."
              />
            </p>
            <p>
              <StaticLang
                en="Winning on track brings an unparalleled sense of achievement that rewards and feeds our passion. To achieve our vision, our team including our drivers will – and must – be tested. In the face of these tests, we contribute positively to motor racing and the legacy of the Silver Arrows by maintaining the highest levels of integrity in the context of intense competition."
                az="Yarış qazanmaq böyük bir nailiyyət hissi gətirir və bu, ehtirasımızı artırır. Vizyonumuzu reallaşdırmaq üçün komanda və sürücülərimiz sınaqlardan keçməli olacaq. Bu sınaqlarda dürüstlüyümüzü qoruyaraq avtomobil idmanına və Gümüş Oxların irsinə töhfə veririk."
              />
            </p>
          </div>
        </div>

        <div className="drivers-info-body">
          <CollectionSlider />
        </div>

        <div className="section-driver-card">
          <AboutDriverCardSec />
        </div>

        <div className="about-drivers">
          <div className="section-header">
            <SectionHeader
              h2={<StaticLang en="The Drivers' Collections" az="Sürücü Kolleksiyaları" />}
              p={<StaticLang en="Kimi or George superfan? Look no further than the Driver Collections to show your support for our boys" az="Kimi və ya George fanatısınız? Dəstəyinizi göstərmək üçün sürücü kolleksiyalarına baxın." />}
            />
          </div>

          <div className="drivers-body">
            <DriversSlider />
          </div>
        </div>

        <div className="about-trending">
          <div className="section-header">
            <SectionHeader
              h1={<StaticLang en="Trending" az="Trenddə Olanlar" />}
              h2={<StaticLang en="Going Fast" az="Sürətlə Satılır" />}
              p={<StaticLang en="Don't miss out on these fast-moving items - get them before they're gone and look the part of a Silver Arrows fan!" az="Bu sürətlə satılan məhsulları qaçırmayın – onları tükənməmiş alın və Silver Arrows fanatı kimi görünün!" />}
            />
          </div>

          <div className="trending-body">
            <TrendingSlider />
          </div>

          <div className="button-cont d-flex justify-content-center">
            <MagneticButton
              text={<StaticLang en="Explore Fanwear" az="Azarkeş Geyimlərini Kəşf Et" />}
            />
          </div>
        </div>

        <div className="subscribe d-flex justify-content-between align-items-center flex-column">
          <SubscribeSec />
        </div>

        <div className="about-store-delivery-payment">
          <FeatureSlider />
        </div>
      </div>
    </div>
  );
};

export default About;
