import 'react'
import "../../assets/scss/components/cards/_colcard.scss"

// eslint-disable-next-line react/prop-types
const CollectionCard = ({img, title}) => {
     return (
     <a className='card' style={{backgroundImage: `url(${img})`}}>
          <div className="card-content" >
               <h4>{title}</h4>
               <p>shop collection</p>
          </div>
     </a>
       
     );
   };
   
   export default CollectionCard;
   