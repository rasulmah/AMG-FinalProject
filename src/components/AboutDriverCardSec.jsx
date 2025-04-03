import  'react'
import MagneticButton from './Buttons/MagneticButton'
import '../assets/scss/components/AboutDriverCardSec.scss'

const AboutDriverCardSec = () => {
  return (
    <div className='section-cont d-flex flex-column justify-content-center align-items-center'>
     <div className="media-cont d-flex flex-column text-center justify-content-center align-items-center gap-2">
     <h3 className='text-light'>Season Team Driver Cards</h3>
     <p className='text-light'>Register your interest today, to get on the list and be the first to receive Team Driver Cards for the Season. Simply sign up to our marketing newsletter using the form below, let us know your favourite driver, and await the arrival of the printed Team Driver Cards on your doorstep. Please note that due to the high demand for Driver cards, we are unable to fulfil every request.</p>
     <MagneticButton text="Get Your Driver Card"></MagneticButton>
     </div>
     
    </div>
  )
}

export default AboutDriverCardSec