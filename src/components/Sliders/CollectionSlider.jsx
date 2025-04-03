import  'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "../../assets/scss/components/sliders/_colslider.scss";

import 'swiper/css';
import 'swiper/css/scrollbar';

import { Scrollbar } from 'swiper/modules';
import CollectionCard from '../Cards/CollectionCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllCollection } from '../../tools/slicers/collectionSlice';


const CollectionSlider = () => {

  const dispatch = useDispatch();
  const { collections} = useSelector((store)=> store.collection);
  console.log(collections)

  useEffect(()=>{
    dispatch(getAllCollection())
  }, [])


  return (
    <Swiper
      observeParents={true}
      observer={true}
      slidesPerView={3.2}
      spaceBetween={5}
      loop={false}
      scrollbar={{ draggable: true }} // Make scrollbar visible
      modules={[Scrollbar]}
      breakpoints={{
        300: {
          slidesPerView: 1,
        },
        550: {
          slidesPerView: 2,
        },

        700: {
          slidesPerView: 2,
        },
        850: {
          slidesPerView: 2.7,
        },
        1024: {
          slidesPerView: 3.2,
        },

      }}
      className="mySwiper2"
      id='CollectionSlider'
    >
      {collections && collections.map((collection) => (
        <SwiperSlide key={collection.id}>
          <CollectionCard img={collection.img} title={collection.title} /></SwiperSlide>
      ))}
      
    </Swiper>
  );
};

export default CollectionSlider;