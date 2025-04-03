import 'react'
import MagneticButton from './Buttons/MagneticButton'

// eslint-disable-next-line react/prop-types
const HeroMain = ({element}) => {

     if (!element) {
          console.error("Product is undefined!", element);
          return null; // Prevent rendering if product is undefined
        }
      
        // eslint-disable-next-line react/prop-types
        const { section_img, section_desc, section_title  } = element;

  return (
    <>
    <div id='heroMain' className='hero-main-section'>
      <section className='hero-main'>
         <div className="first-section"  style={{ backgroundImage: `url(${section_img})` }}> 
        </div> 
      </section>
    </div>

    <div className="hero-text d-flex  align-items-center flex-column">
      <div className="hero-content d-flex justify-content-between align-items-center flex-column">  
  <p className='kicker'>{section_desc}</p>
      <h2 className='title'>{section_title}</h2> 
      </div>
      <MagneticButton className="d-flex"  text="Shop Now"></MagneticButton>
    </div>
    </>
  )
}

export default HeroMain