import 'react'
import "../../assets/scss/components/cards/_drivercard.scss"

// eslint-disable-next-line react/prop-types
const DriversCard = ({img, name, number}) => {
  return (
    <div className='driver-card' style={{backgroundImage: `url(${img})`}}>
    <div className="driver-card-content " >
    <div className='d-flex justify-content-between flex-column align-items-start'>
          <p className="Drivers-Number">{number}</p>
          <h3 className="Drivers-Name">{name}</h3>
          <a className='link'>
          <span>Shop {name}</span>
          </a>
     </div>

    </div>
     </div>
  )
}

export default DriversCard