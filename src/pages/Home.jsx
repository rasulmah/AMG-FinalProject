import  { useEffect } from 'react'
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











const Home = () => {

  
  const dispatch = useDispatch();
  const {elements} = useSelector((store) => store.element);
  console.log(elements);

  useEffect(()=>{
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
        <SectionHeader h1="New 2025" h2="New Collections" p="Grab the latest collections from Official Team Merchandise">
        </SectionHeader>
      </div>

      <div className="section-body">
        <CollectionSlider></CollectionSlider>
      </div>

      <MagneticButton text="Shop Fanwear" ></MagneticButton>
    </section>


    <section className="drivers d-flex justify-content-between align-items-center flex-column">
      <div className="section-header">
        <SectionHeader h1="Drivers" h2="The Drivers' Collections" p="Kimi or George superfan? Look no further than the Driver Collections to show your support for our boys">
        </SectionHeader>
      </div>

      <div className="drivers-body">
        <DriversSlider></DriversSlider>
      </div>

    </section>



    <section className="trending d-flex justify-content-between align-items-center flex-column">
      <div className="section-header">
        <SectionHeader h1="Trending" h2="Going Fast" p="Don't miss out on these fast-moving items - get them before they're gone and look the part of a Silver Arrows fan!">
        </SectionHeader>
      </div>

      <div className="trending-body">
        <TrendingSlider></TrendingSlider>
      </div>

      <MagneticButton text="Explore Fanwear"  ></MagneticButton>
    </section>


    <section className="featured d-flex justify-content-between align-items-center flex-column">
      <div className="section-header">
        <SectionHeader  h2="Featured Collections" >
        </SectionHeader>
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