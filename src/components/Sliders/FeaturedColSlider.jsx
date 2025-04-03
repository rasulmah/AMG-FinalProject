import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../assets/scss/components/sliders/_featuredcolSlider.scss';
import SwiperNavButtons from '../Buttons/SwiperNavButtons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../tools/slicers/productSlice';
import Product from '../../pages/Product';

// eslint-disable-next-line react/prop-types
const TrendingSlider = ({ categoryName }) => { // ✅ Receive category name as prop
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // ✅ Filter products based on the received category name
  const filteredProducts = products?.filter(product => product.category === categoryName) || [];

  return (
    <Swiper 
      slidesPerView="auto"
      spaceBetween={5}
      navigation={true} 
      modules={[Navigation, Pagination]}
      className="mySwiper5"
      id="FeaturedColSlider"
    >
      <SwiperNavButtons />
      
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <Product product={product} />
          </SwiperSlide>
        ))
      ) : (
        <p>No products found for {categoryName}.</p> // ✅ Show a message if no products match
      )}
    </Swiper>
  );
}

export default TrendingSlider;


