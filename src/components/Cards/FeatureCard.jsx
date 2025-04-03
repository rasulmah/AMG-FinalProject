import 'react'
import "../../assets/scss/components/cards/_fcard.scss"

// eslint-disable-next-line react/prop-types
const FeatureCard = ({img, title, desc}) => {
  return (
    <div className='card-container d-flex flex-column justify-content-between align-items-center'>
     <img src={img} alt="" />
     <h3 className='card-heading'>{title}</h3>
     <p className='card-text'>{desc}</p>
    </div>
  )
}

export default FeatureCard