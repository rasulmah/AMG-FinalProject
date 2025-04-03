import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';

import { Scrollbar } from 'swiper/modules';
import '../../assets/scss/components/sliders/_trendingSlider.scss';
/* import SingleProductSm from '../Cards/SingleProductSm'; */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllProducts } from '../../tools/slicers/productSlice';
import Product from '../../pages/Product';


const TrendingSlider = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Filter only products where trending is true
  const trendingProducts = products?.filter(product => product.trending === "true");

  return (
    <Swiper
      observeParents={true}
      observer={true}
      slidesPerView={"auto"}
      spaceBetween={5}
      modules={[Scrollbar]}
      className="mySwiper4"
      id="trendingSlider"
    >
      {trendingProducts.length > 0 ? (
        trendingProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <Product product={product} />
          </SwiperSlide>
        ))
      ) : (
        <p>No trending products found.</p>
      )}
    </Swiper>
  );
};

export default TrendingSlider;
