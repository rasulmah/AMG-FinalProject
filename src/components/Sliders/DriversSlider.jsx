import  'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import '../../assets/scss/components/sliders/_driverslider.scss'
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import DriversCard from '../Cards/DriversCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllDrivers } from '../../tools/slicers/driverSlice';


const DriversSlider = () => {
  const dispatch = useDispatch();
  const {drivers} = useSelector((store) => store.driver);
  console.log(drivers)

  useEffect(()=>{
    dispatch(getAllDrivers())
  }, [])

  return (
     <>
     <Swiper
     slidesPerView={4}
     spaceBetween={30}
     pagination={{
       clickable: true,
     }}
     breakpoints={{
       300: {
         slidesPerView: 1,
         spaceBetween: 5,
       },
       850: {
         slidesPerView: 2,
         spaceBetween: 5,
       },
       1024: {
         slidesPerView: 2,
         spaceBetween: 5,
       },
     }}
     modules={[Pagination]}
     className="mySwiper3"
     id="DriversSlider">
       
       {drivers && drivers.map((driver) =>  (
        <SwiperSlide key={driver.id}>
          <DriversCard 
          img={driver.img}
          name={driver.name}
          number={driver.number}
          >
          </DriversCard>
       </SwiperSlide>
       ))}
       
     </Swiper>
   </>
  )
}

export default DriversSlider