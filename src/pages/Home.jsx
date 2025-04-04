import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMainPageElements } from '../tools/slicers/mainPageSlice'

import '../assets/scss/pages/_home.scss'
import '../assets/scss/components/cards/_featruedColCardRight.scss'

import FeatureSlider from '../components/Sliders/FeatureSlider'
import CollectionSlider from '../components/Sliders/CollectionSlider'
import MagneticButton from '../components/Buttons/MagneticButton'
import TrendingSlider from '../components/Sliders/TrendingSlider'
import SectionHeader from '../components/SectionComponents/SectionHeader'
import DriversSlider from '../components/Sliders/DriversSlider'
import SubscribeSec from '../components/SectionComponents/SubscribeSec'
import HeroMain from '../components/HeroMain'
import ProductCategories from '../components/ProductCategories'
import StaticLang from '../utils/StaticLang'











const Home = () => {


  const dispatch = useDispatch();
  const { elements } = useSelector((store) => store.element);
  console.log(elements);

  useEffect(() => {
    dispatch(getAllMainPageElements())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])




  return (
    <>
      {elements && elements.map((element) => (
        <HeroMain element={element} key={element.id} ></HeroMain>
      ))}


      <section className='second-section d-flex justify-content-center align-items-center'>
        <FeatureSlider />
      </section>

      <div className="sections">

        <section className="collections d-flex justify-content-between align-items-center flex-column">
          <div className="section-header">
            <SectionHeader
              h1={<StaticLang en="New 2025" az="Yeni 2025" />}
              h2={<StaticLang en="New Collections" az="Yeni Kolleksiyalar" />}
              p={<StaticLang en="Grab the latest collections from Official Team Merchandise" az="Rəsmi komanda məhsullarından ən son kolleksiyaları əldə edin" />}
            />
          </div>

          <div className="section-body">
            <CollectionSlider></CollectionSlider>
          </div>

          <MagneticButton text={<StaticLang en="Shop Fanwear" az="Azarkeş Geyimlərini Al" />} />
        </section>


        <section className="drivers d-flex justify-content-between align-items-center flex-column">
          <div className="section-header">
            <SectionHeader
              h1={<StaticLang en="Drivers" az="Sürücülər" />}
              h2={<StaticLang en="The Drivers' Collections" az="Sürücü Kolleksiyaları" />}
              p={
                <StaticLang
                  en="Kimi or George superfan? Look no further than the Driver Collections to show your support for our boys"
                  az="Kimi və ya George fanatısınız? Dəstəyinizi göstərmək üçün Sürücü Kolleksiyalarına baxın"
                />
              }
            />
          </div>

          <div className="drivers-body">
            <DriversSlider></DriversSlider>
          </div>

        </section>



        <section className="trending d-flex justify-content-between align-items-center flex-column">
          <div className="section-header">
            <SectionHeader
              h1={<StaticLang en="Trending" az="Trenddə Olanlar" />}
              h2={<StaticLang en="Going Fast" az="Sürətlə Satılır" />}
              p={
                <StaticLang
                  en="Don't miss out on these fast-moving items - get them before they're gone and look the part of a Silver Arrows fan!"
                  az="Bu sürətlə satılan məhsulları qaçırmayın – onlar tükənməmiş alın və Silver Arrows fanatı kimi görün!"
                />
              }
            />

          </div>

          <div className="trending-body">
            <TrendingSlider></TrendingSlider>
          </div>

          <MagneticButton text={<StaticLang en="Explore Fanwear" az="Azarkeş Geyimlərini Kəşf Et" />} />

        </section>


        <section className="featured d-flex justify-content-between align-items-center flex-column">
          <div className="section-header">
          <SectionHeader
  h2={<StaticLang en="Featured Collections" az="Seçilmiş Kolleksiyalar" />}
/>
          </div>

          <div className="featured-body">
            <ProductCategories></ProductCategories>
          </div>

        </section>


        <section className="subscribe d-flex justify-content-between align-items-center flex-column">
          <SubscribeSec></SubscribeSec>
        </section>

      </div>


    </>

  )
}

export default Home