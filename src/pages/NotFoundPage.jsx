import 'react'
import MagneticButton from "../components/Buttons/MagneticButton"
import '../assets/scss/pages/_notFoundPage.scss'
import SubscribeSec from '../components/SectionComponents/SubscribeSec'
import TrendingSlider from '../components/Sliders/TrendingSlider'

const NotFoundPage = () => {
  return (
    <>
    <div className='text-light img-container'>
      <p className='text'>404</p>
      <h2 className='h2 mb-4'>Sorry, we couldn`t find that!</h2>
      <div className="button">
      <MagneticButton text={"Continue Shopping"}></MagneticButton>
      </div>
      
    </div>
    <div className="trending-body py-5">
      <h1 className='text-light text-center pb-5'>Look! what is trending now...</h1>
        <TrendingSlider></TrendingSlider>
      </div>
    <section className="subscribe d-flex justify-content-between align-items-center flex-column">
      <SubscribeSec></SubscribeSec>
    </section>
    </>
  )
}

export default NotFoundPage