import 'react'

import '../../assets/scss/components/cards/_featuredColCard.scss'
import StaticLang from '../../utils/StaticLang'
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const FeaturedColCard = ({img, title, desc}) => {
  return (
    <div className='featured-card-container d-flex flex-column align-items-left justify-content-end'
    style={{ backgroundImage: `url(${img})`} }>
      <div className="t-body d-flex flex-column align-items-left justify-content-center "
      
      >
        <h3 className="category category-heading">{title}</h3>
        <p className="category-subtext">
        {desc}
        </p>
        <a className='shp-text d-flex'>
          <Link className='text' to={"/products"}><StaticLang en="Shop" az="Keç" /></Link> 
          <p className='category'>{title}</p>
        </a>
      </div>
      
    </div>
  )
}

export default FeaturedColCard