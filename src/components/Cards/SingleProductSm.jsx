/* import { useState } from "react";
import '../../assets/scss/components/cards/_singleProductSmall.scss'
import { useNavigate } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const SingleProductSm = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  // eslint-disable-next-line react/prop-types
  const {id, price, img, imghover, title, ratings} = product;

  const navigate = useNavigate();

  return (
    <div
      className="product-container d-flex justify-content-between align-items-end flex-column"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
      onClick={()=> navigate('products/' + id)}
        className="product-img" 
        style={{ backgroundImage: `url(${isHovered ? imghover : img})` }}
      ></div>
      <div className="info-container">
        <h3 className="title">{title}</h3>
        <div className="info-body d-flex justify-content-between align-items-center">
          <p className='price'>{price} AZN</p>
          <p className="rating">{ratings} ulduz</p>
        </div>
      </div>
    </div>
  );
};

export default SingleProductSm; */

