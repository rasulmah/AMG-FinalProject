// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import '../../assets/scss/components/sliders/_featureslider.scss'

// import required modules
import {  Autoplay, Pagination } from 'swiper/modules';
import FeatureCard from '../Cards/FeatureCard';
import StaticLang from '../../utils/StaticLang';


const FeatureSlider = () => {

  return (
    <Swiper
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 3000, // Set loop interval to 3 seconds (3000ms)
          disableOnInteraction: true, // Keep autoplay running even after user interaction
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: { delay: 2000 }
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: { delay: 2000 }
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
            loop: false
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        id="FeatureSlider"
      >
        <SwiperSlide>
  <FeatureCard
    img={"//shop-int.mercedesamgf1.com/cdn/shop/files/usp_merchandise.png?v=1700130004&width=25"}
    title={<StaticLang en="Official Merchandise" az="Rəsmi Məhsullar" />}
    desc={<StaticLang en="The Official Destination for Silver Arrows Merchandise" az="Silver Arrows üçün rəsmi məhsulların ünvanı" />}
  />
</SwiperSlide>

<SwiperSlide>
  <FeatureCard
    img={"//shop-int.mercedesamgf1.com/cdn/shop/files/usp_shipping.png?v=1700130018&width=25"}
    title={<StaticLang en="Worldwide Delivery" az="Dünya üzrə Çatdırılma" />}
    desc={<StaticLang en="Racing to your door with DPD express worldwide delivery" az="DPD ilə sürətli və qlobal çatdırılma – qapınıza qədər" />}
  />
</SwiperSlide>

<SwiperSlide>
  <FeatureCard
    img={"//shop-int.mercedesamgf1.com/cdn/shop/files/usp_exclusive.png?v=1700130032&width=25"}
    title={<StaticLang en="Exclusive Products" az="Eksklüziv Məhsullar" />}
    desc={<StaticLang en="Shop with the Team to get access to Official merchandise" az="Komanda ilə alış-veriş edərək rəsmi məhsullara sahib olun" />}
  />
</SwiperSlide>

<SwiperSlide>
  <FeatureCard
    img={"https://shop-int.mercedesamgf1.com/cdn/shop/files/usp_next_day_delivery.png?v=1700130046&width=25"}
    title={<StaticLang en="Tracked Delivery" az="İzlənən Çatdırılma" />}
    desc={<StaticLang en="Fast, tracked and secure DPD delivery straight to your door" az="Sürətli, izlənən və təhlükəsiz DPD çatdırılması birbaşa qapınıza" />}
  />
</SwiperSlide>

        


        
      </Swiper>
  );
};

export default FeatureSlider;

