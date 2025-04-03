/* eslint-disable react/prop-types */
import { useState } from "react";
import {useNavigate } from "react-router-dom"
import '../../assets/scss/components/cards/_wishlistcard.scss'
import { useDispatch } from "react-redux";
import { addToBasket } from "../../tools/slicers/basketSlice";
import Swal from "sweetalert2";

const WishlistCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleAddToBasket = () => {
    if (count === 0) {
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "You must select at least 1 item!",
        });
        return;
    }

    dispatch(addToBasket({ ...product, count }));

    Swal.fire({
        icon: "success",
        title: "Success!",
        text: `${count} count ${title}(s) added to your basket!`,
        timer: 1500,
        showConfirmButton: false
    });

    setCount(0); // Reset counter after adding to basket
};



  if (!product) {
    console.error("Product is undefined!", product);
    return null; 
  }

  const { id, title, img, imghover, price } = product;
 
  const increment = () => setCount(count + 1);
  const decrement = () => count > 0 && setCount(count - 1);


 


  return (
    <div
      className="wishlist-card-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div
        onClick={() => navigate("/products/" + id)}
        className="product-img"
        style={{ backgroundImage: `url(${isHovered ? imghover : img})` }}>

      </div>
      
      

      <div className="info-container">
      <div className="basket-handler-contaier">
      <div className="counter">
        <button className="dec-btn" onClick={decrement}><i className="fa-solid fa-minus"></i></button>
        <span>{count}</span>
        <button className="dec-btn" onClick={increment}><i className="fa-solid fa-plus"></i></button>
      </div>
      <div className="add-to-basket">
        <button onClick={handleAddToBasket}>Add to basket</button>
      </div>
      </div>
          <h3 className="title">{title}</h3>
          <div className="info-body">
            <p className="price">{price} AZN</p>
          </div>
      </div>
    </div>
  );
};

export default WishlistCard;