import  { useRef, useState } from 'react';
import '../assets/scss/pages/_about.scss';
import MyVideo from '../assets/videos/My Video-1.mp4';
import SectionHeader from '../components/SectionComponents/SectionHeader'
import CollectionSlider from '../components/Sliders/CollectionSlider';
import AboutDriverCardSec from '../components/AboutDriverCardSec';
import DriversSlider from '../components/Sliders/DriversSlider';
import TrendingSlider from '../components/Sliders/TrendingSlider';
import MagneticButton from '../components/Buttons/MagneticButton';
import SubscribeSec from '../components/SectionComponents/SubscribeSec';
import FeatureSlider from '../components/Sliders/FeatureSlider';


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
      <video ref={videoRef} autoPlay loop muted >
        <source src={MyVideo} type="video/mp4" />
      </video>
    
      <button className="mute-btn" onClick={toggleMute}>
        <i className={isMuted ? "fas fa-volume-mute" : "fas fa-volume-up"}></i>
      </button>

      <div className='about-title d-flex flex-column gap-3'>
        <div>
        <h1 className='about-title-heading'>About</h1>
        <p className='about-title-text'>
      Mercedes AMG Petronas <span className='italic-text'>F1 Team</span></p>
        </div>
        
      <a href="#about-main" className="learn-more">Learn More</a>
      </div>
    </div>

    <div id="about-main">
      <h3 className='about-main-heading d-flex justify-content-center align-items-center'>Mercedes-AMG PETRONAS Formula One Team is the works team of Mercedes-AMG, competing at the pinnacle of motorsport – the FIA Formula One™ World Championship.</h3>

     

      <div className="about-container">
      <SectionHeader h1="The Team" h2="Our History"></SectionHeader>
      <h2 className="title">The Silver Arrows</h2>
      <div className="grid-container">
        <p>
          Formula One is a sport like no other. Combining elite teamwork, cutting-edge 
          technologies and innovation, high-performance management and exceptional 
          driving skill, teams develop race cars capable of competing against their rivals 
          in a high-octane environment that spans upwards of 20 races across five 
          continents throughout each season.
        </p>
        <p>
          Winning seven consecutive double Drivers’ and Constructors’ World Championships 
          from 2014 to 2020 and securing a record-breaking eighth consecutive Constructors’ 
          Championship success in 2021, the Team is one of the most successful in the sport’s history.
        </p>
        <p>
          The Mercedes-AMG PETRONAS Formula One Team, based across Technology Centres 
          at Brackley and Brixworth in the United Kingdom, brings together over 1,000 dedicated 
          and determined people that design, develop, manufacture and race the cars driven by 
          Kimi Antonelli and George Russell.
        </p>
        <p>
          Winning on track brings an unparalleled sense of achievement that rewards and feeds 
          our passion. To achieve our vision, our team including our drivers will – and must – be 
          tested. In the face of these tests, we contribute positively to motor racing and the 
          legacy of the Silver Arrows by maintaining the highest levels of integrity in the context 
          of intense competition.
        </p>
      </div>
    </div>
    <div className="drivers-info-body">
        <CollectionSlider></CollectionSlider>
      </div>

      <div className="section-driver-card">
      <AboutDriverCardSec></AboutDriverCardSec>
      </div>

      <div className="about-drivers">
      <div className="section-header">
        <SectionHeader  h2="The Drivers' Collections" p="Kimi or George superfan? Look no further than the Driver Collections to show your support for our boys">
        </SectionHeader>
      </div>

      <div className="drivers-body">
        <DriversSlider></DriversSlider>
      </div>
      </div>

      <div className="about-trending ">
      <div className="section-header">
        <SectionHeader h1="Trending" h2="Going Fast" p="Don't miss out on these fast-moving items - get them before they're gone and look the part of a Silver Arrows fan!">
        </SectionHeader>
      </div>

      <div className="trending-body">
        <TrendingSlider></TrendingSlider>
      </div>
      <div className="button-cont d-flex justify-content-center">
      <MagneticButton text="Explore Fanwear"  ></MagneticButton>
      </div>
      
      </div>
      <div className='subscribe d-flex justify-content-between align-items-center flex-column'>
      <SubscribeSec></SubscribeSec>
      </div>

      <div className="about-store-delivery-payment">
      <FeatureSlider />
      </div>
     
      


    </div>
    </div>
  );
};

export default About;
