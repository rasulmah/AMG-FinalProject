import 'react'
import "../../assets/scss/components/_sectionheader.scss"
// eslint-disable-next-line react/prop-types
const SectionHeader = ({h1, h2, p}) => {
  return (
    <div className='container'>
     <h1>{h1}</h1>
     <div className="bottom-content">
     <h2>{h2}</h2>
     <p>{p}</p>
     </div>
     
    </div>
  )
}

export default SectionHeader