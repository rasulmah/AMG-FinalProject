import  'react'
import { useSwiper } from 'swiper/react'

const SwiperNavButtons = () => {
     const swiper = useSwiper();

  return (
    <div className="swiper-nav-btns">
     <button onClick={() => swiper.slidePrev()}><i className="fa-solid fa-chevron-left" />
</button>
     <button onClick={() => swiper.slideNext()}><i className="fa-solid fa-chevron-right" />
</button>
    </div>
  )
}

export default SwiperNavButtons