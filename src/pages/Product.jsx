/* eslint-disable react/prop-types */
import { useState } from "react";
import "../assets/scss/components/cards/_singleProductSmall.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../tools/slicers/wishlistSlice"; 
import Swal from "sweetalert2";
import { useLang } from "../context/LangContext";

const Product = ({ product }) => {
  const { language } = useLang();
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); 
  const wishlistProducts = useSelector((state) => state.wishlist.wishlistProducts);

  if (!product) {
    console.error("Product is undefined!", product);
    return null; 
  }

  const { id, title, img, imghover, price, ratings, trending, sizes, description } = product;

  // Check if product is in wishlist
  const isInWishlist = wishlistProducts.some((p) => p.id === id);

  const handleToggleWishlist = (e) => {
    e.preventDefault();
  
    if (!user) {
      Swal.fire({
        title: language === "az" ? "Zəhmət olmasa daxil olun" : "Please Log In",
        text: language === "az"
          ? "İstək siyahısına əlavə etmək üçün daxil olun. Lakin, daxil olmadan da saxlaya bilərsiniz, lakin səbətə əlavə etmək və almaq mümkün olmayacaq."
          : "You must be logged in to add items to your wishlist. However, you can still save it for later, but you won't be able to checkout or add to cart.",
        icon: "warning",
        customClass: {
          icon: "swal-log-in-icon",
          popup: "swal-log-in-popup",
          htmlContainer: "swal-log-in-text",
          title: "swal-log-in-title",
          confirmButton: "swal-log-in-button",
          cancelButton: "swal-log-in-cancel",
          container: "swal-log-in-container"
        },
        showCancelButton: true,
        confirmButtonText: language === "az" ? "Daxil ol" : "Log In",
        cancelButtonText: language === "az" ? "Daxil olmadan saxla" : "Save Without Logging In",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        } else {
          if (isInWishlist) {
            dispatch(removeFromWishlist(id));
            Swal.fire({
              title: language === "az" ? "Silindi!" : "Removed!",
              text: language === "az"
                ? "Məhsul istək siyahınızdan silindi."
                : "Product removed from your wishlist.",
              icon: "info",
            });
          } else {
            const payload = { id, title, img, imghover, sizes, price, ratings, description };
            dispatch(addToWishlist(payload));
  
            Swal.fire({
              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                const content = Swal.getHtmlContainer()?.querySelector("span.timer-text");
                if (content) {
                  const interval = setInterval(() => {
                    
                  }, 100);
                  Swal.stopTimer = () => clearInterval(interval);
                }
              },
              willClose: () => {
                if (Swal.stopTimer) Swal.stopTimer();
              },
              html: `
                <div style="display: flex; align-items: start; gap: 10px;">
                  <img src="${img}" alt="${title}" style="width: 80px; height: 80px; object-fit: cover;">
                  <span class="timer-text" style="font-size: 16px; font-weight: 300; text-align: left;">
                    ${title} ${language === "az" ? "istək siyahınıza əlavə edildi" : "has successfully been added to your wishlist"}
                  </span>
                </div>
              `,
              showConfirmButton: false,
              allowOutsideClick: true,
              customClass: {
                popup: "swal-log-in-popup-1",
                htmlContainer: "swal-log-in-text-1",
                container: "swal-log-in-container-1"
              },
            });
          }
        }
      });
      return;
    }
  
    if (isInWishlist) {
      dispatch(removeFromWishlist(id));
      Swal.fire({
        title: language === "az" ? "Silindi!" : "Removed!",
        text: language === "az"
          ? "Məhsul istək siyahınızdan silindi."
          : "Product removed from your wishlist.",
        icon: "info",
      });
    } else {
      const payload = { id, title, img, imghover, sizes, price, ratings, description };
      dispatch(addToWishlist(payload));
  
      Swal.fire({
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          const content = Swal.getHtmlContainer()?.querySelector("span.timer-text");
          if (content) {
            const interval = setInterval(() => {
             
            }, 100);
            Swal.stopTimer = () => clearInterval(interval);
          }
        },
        willClose: () => {
          if (Swal.stopTimer) Swal.stopTimer();
        },
        html: `
          <div style="display: flex; align-items: start; gap: 10px;">
            <img src="${img}" alt="${title}" style="width: 80px; height: 80px; object-fit: cover;">
            <span class="timer-text" style="font-size: 16px; font-weight: 300; text-align: left;">
              ${title} ${language === "az" ? "istək siyahınıza əlavə edildi" : "has successfully been added to your wishlist"}
            </span>
          </div>
        `,
        showConfirmButton: false,
        allowOutsideClick: true,
        customClass: {
          popup: "swal-log-in-popup-1",
          htmlContainer: "swal-log-in-text-1",
          container: "swal-log-in-container-1"
        },
      });
    }
  };

  return (
    <div
      className="product-container d-flex justify-content-between align-items-end flex-column"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <NavLink to={"/wishlist"} className="add-wishlist" onClick={handleToggleWishlist}>
  <svg 
    className={`heart-icon ${isInWishlist ? "active" : ""}`} 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 18 18"
  >
    <path
      className="ico-Wishlist_Middle"
      fillRule="evenodd"
      d="M.5 6.143a4.643 4.643 0 0 1 8.214-2.965 4.643 4.643 0 0 1 8.214 2.965c0 1.282-.566 2.398-1.36 3.283-.822.918-2.536 2.687-4.044 4.226a609.753 609.753 0 0 1-2.455 2.49.5.5 0 0 1-.71 0 717.66 717.66 0 0 1-2.455-2.49c-1.508-1.54-3.221-3.308-4.044-4.226C1.066 8.54.5 7.425.5 6.143Z"
    />
  </svg>
</NavLink>


      {trending === "true" ? <div className="trending-banner">Trending</div> : null}

      <div
        onClick={() => navigate("/products/" + id)}
        className="product-img"
        style={{ backgroundImage: `url(${isHovered ? imghover : img})` }}
      ></div>

      <div className="size d-flex justify-content-center align-items-center">
        <ul className="size-container">
          {sizes && sizes.map((size) => (
            <li onClick={() => navigate("/products/" + id)} className="sizes" key={size}>{size}</li>
          ))}
        </ul>
      </div>

      <div className="info-container">
        <h3 className="title">{title}</h3>
        <div className="info-body d-flex justify-content-between align-items-center">
          <p className="price">{price} AZN</p>
          <div className="rating">
            <p className="px-1">({ratings})</p>
            {[...Array(5)].map((_, index) => (
              <svg 
                key={index} 
                viewBox="0 0 18 18" 
                xmlns="http://www.w3.org/2000/svg" 
                role="img" 
                width={15} 
                height={15} 
                aria-label={`Star ${index + 1} out of 5`}
              >
                <path 
                  d="M9 14.118L14.562 17.475L13.086 11.148L18 6.891L11.529 6.342L9 0.375L6.471 6.342L0 6.891L4.914 11.148L3.438 17.475L9 14.118Z" 
                  stroke="rgba(44,44,44,1)" 
                  fill={index < ratings ? "#000" : "#fff"} 
                />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
