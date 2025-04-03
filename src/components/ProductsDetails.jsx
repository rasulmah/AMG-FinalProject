import  { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import SubscribeSec from '../components/SectionComponents/SubscribeSec'
import "../assets/scss/components/_product-details.scss"


import { getAllProducts, setSelectedProduct } from '../tools/slicers/productSlice';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';



// import required modules
import { EffectCards } from 'swiper/modules';
import TrendingSlider from './Sliders/TrendingSlider';
import { addToBasket, calculateBasket } from '../tools/slicers/basketSlice';
import Swal from 'sweetalert2';
import { addToWishlist, removeFromWishlist } from '../tools/slicers/wishlistSlice';
import supabase from '../utils/supabase';



const ProductDetails = () => {
     const { id } = useParams();
  const productId = parseInt(id, 10);
  const { products, selectedProduct } = useSelector((store) => store.product);
  const wishlistProducts = useSelector((state) => state.wishlist.wishlistProducts);
  const user = useSelector((state) => state.auth.user); // User from the Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { price, img, title, description, images, imghover, reviews, ratings, colors, sizes } = selectedProduct;

  // Add to Wishlist handler
  const HandleAddToWishlist = () => {
     if (!user) {
         Swal.fire({
             title: "Please Log In",
             text: "You must be logged in to add items to your wishlist. You can still save the product without logging in, but you won't be able to checkout or add to cart.",
             icon: "warning",
             showCancelButton: true,
             confirmButtonText: "Log In",
             cancelButtonText: "Save Without Logging In",
         }).then((result) => {
             if (result.isConfirmed) {
                 navigate("/login");
             } else {
                 toggleWishlist();
             }
         });
         return;
     }
 
     toggleWishlist();
 };
 
 const toggleWishlist = () => {
     const payload = { 
         id: productId,  
         title, 
         img, 
         imghover, 
         sizes, 
         price: Number(price),  
         ratings, 
         description 
     };
 
     const isAlreadyAdded = wishlistProducts.some((p) => p.id === productId);
 
     if (isAlreadyAdded) {
         // Remove from wishlist
         dispatch(removeFromWishlist(productId)); // Ensure `removeFromWishlist` exists in your slicer
         Swal.fire("Removed!", "Product removed from your wishlist.", "info");
     } else {
         // Add to wishlist
         dispatch(addToWishlist(payload));
         Swal.fire("Saved!", "Product successfully added to your wishlist!", "success");
     }
 };

  // Add to Basket handler
  const addBasket = () => {
    if (!user) {
      Swal.fire({
        title: "Please Log In",
        text: "You must be logged in to add items to your basket.",
        icon: "warning",
        confirmButtonText: "Log In",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    const payload = {
      id: productId,
      price,
      img,
      title,
      description,
      count
    };

    if (count > 0) {
      dispatch(addToBasket(payload));
      Swal.fire("Saved!", "Product successfully added to the basket!", "success");
      dispatch(calculateBasket());
    } else {
      Swal.fire("Try Again!", "You must enter more than 0 products", "error");
    }
  };

  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => count > 0 && setCount(count - 1);

  useEffect(() => {
     const fetchProduct = async () => {
       try {
         // Always call getAllProducts to ensure we have the latest data
         if (!products.length) {
           await dispatch(getAllProducts());
         }
   
         const foundProduct = products.find((p) => p.id === productId);
         if (foundProduct) {
           dispatch(setSelectedProduct(foundProduct));
         } else {
           const { data, error } = await supabase
             .from('products')
             .select('*')
             .eq('id', productId)
             .single();
   
           if (error) throw error;
           dispatch(setSelectedProduct(data));
         }
       } catch (error) {
         console.error("Error fetching product:", error);
       }
     };
   
     fetchProduct();
   }, [productId, dispatch, products]);
   
   

  return (
     <>
    <div className="product-detail-body">
     

     <div className="product-detail-columns">

          <div className="product-detail-column product-detail-media">
               <div className="product-media">
                    <div className="images-container ">
                    <img className='product-image' src={img} alt="" />
                    <img className='product-image' src={imghover}  alt="" />
                    {images && images.length > 0 && 
                         images.map((image, index) => (
                              <img className='product-image'  key={index} src={image} alt={`Product Image ${index + 1}`} />
                    ))}
                    </div>
                    

                    <Swiper
                         effect={'cards'}
                         grabCursor={true}
                         modules={[EffectCards]}
                         className="mySwiper"
                         >
                         <SwiperSlide><img className='product-image-mobile' src={imghover}  alt="" /></SwiperSlide>
                         <SwiperSlide><img className='product-image-mobile' src={img} alt="" /></SwiperSlide>
                         {images && images.length > 0 && 
                         images.map((image, index) => (
                              <SwiperSlide key={index}><img className='product-image-mobile'  key={index} src={image} alt={`Product Image ${index + 1}`} /></SwiperSlide>
                    ))}
                         </Swiper>
               </div>
          </div>

          <div className="product-detail-main">
                    <div className="product-info">
                         <div className="heading d-flex justify-content-between align-items-center gap-4">
                              <p className="product-title">{title}</p>
                              <button 
  onClick={(e) => { 
    e.preventDefault(); 
    HandleAddToWishlist(); 
  }} 
  className={`prd-wishlist-btn d-flex justify-content-center align-items-center ${wishlistProducts.some(p => p.id === productId) ? "active" : ""}`}
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
    <path 
      className="ico-Wishlist_Middle" 
      d="M.5 6.143a4.643 4.643 0 0 1 8.214-2.965 4.643 4.643 0 0 1 8.214 2.965c0 1.282-.566 2.398-1.36 3.283-.822.918-2.536 2.687-4.044 4.226a609.753 609.753 0 0 1-2.455 2.49.5.5 0 0 1-.71 0 717.66 717.66 0 0 1-2.455-2.49c-1.508-1.54-3.221-3.308-4.044-4.226C1.066 8.54.5 7.425.5 6.143Z"
    />
  </svg>
</button>

                         </div>
                         <div className="prd-price-rating d-flex justify-content-between">
                              <p className='price'>m.{price} AZN</p>
                              <div className='reviews d-flex justify-content-center align-items-center gap-2'>({reviews} reviews)
                                   <div className='d-flex justify-content-center align-items-center gap-1'>{[...Array(5)].map((_, index) => (
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
                                   ))}</div>
                              </div>
                         </div>
                    </div>
                    <hr />
                    <div className='colors d-flex flex-column justify-content-between gap-4' >
                         <div className="colors-media d-flex flex-column gap-1 justify-content-between ">
                         <p className="color">Colours: {colors?.length ? colors.join(", ") : "N/A"}</p>

                         <div className="color-container d-flex gap-1 mt-1">
                              {colors?.length > 0 && colors.map((color, index) => (
                              <div
                                   key={index}
                                   className="color-product"
                                   style={{ backgroundColor: color }}
                              />
                         ))}
                         </div>
                         <div className='d-flex justify-content-center align-items-center w-100'>
                         <div className='prod-det-sizes'>
                         {sizes?.length ? (
  sizes.map((size, index) => <p key={index} className="prod-det-size">{size}</p>)
) : (
  <p className="prod-det-size">N/A</p>
)}
                         </div>
                         </div>
                         </div>
                         
                    </div>
                    <hr />
                    <div className='payment-container d-flex flex-column gap-3'>
                         <div className="payment-stock-warning">
                              <div className="circle-cont d-flex align-items-center gap-1">
                              <span className='circle d-flex align-items-center'></span>
                              <p className='mb-0'>In stock, ready to ship today</p>
                              </div>
                              <p>Hurry! Express shipping available! Order within <b>6Hrs 37Mins</b></p>
                              <div>
                                   <div className='count-container d-flex justify-content-start align-items-center'>
                                        <button className='' onClick={decrement}><i className="fa-solid fa-minus"></i></button>
                                        <span className='h4 mb-0'>{count}</span>
                                        <button className='' onClick={increment}><i className="fa-solid fa-plus"></i></button>
                                        
                                        
                                   </div>
                              </div>
                         </div>
                         <div>
                         <button onClick={addBasket}  className='add-to-cart-btn d-flex justify-content-between align-items-center'>Add To Cart
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path fill="currentColor" fillRule="evenodd" d="M13.186 6.5H4.76a2 2 0 0 0-1.993 1.834l-.68 8.166h13.82l-.729-8.177A2 2 0 0 0 13.186 6.5Zm2.989 1.734A3 3 0 0 0 13.186 5.5H4.76a3 3 0 0 0-2.99 2.75L1 17.5h16l-.825-9.266Z" clipRule="evenodd" /><path fill="currentColor" fillRule="evenodd" d="M9 2.5A2.5 2.5 0 0 0 6.5 5v3.5h-1V5a3.5 3.5 0 1 1 7 0v3.5h-1V5A2.5 2.5 0 0 0 9 2.5Z" clipRule="evenodd" /></svg>
                         </button>
                         <div className="card-icons d-flex gap-1 justify-content-left align-items-center">
                              <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width={38} height={24} aria-labelledby="pi-visa">
                              <title id="pi-visa">Visa</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" /><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" /><path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z" fill="#142688" />
                              </svg>
                              
                              <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-american_express" viewBox="0 0 38 24" width={38} height={24}>
                              <title id="pi-american_express">American Express</title><path fill="#000" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z" opacity=".07" /><path fill="#006FCF" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32Z" /><path fill="#FFF" d="M22.012 19.936v-8.421L37 11.528v2.326l-1.732 1.852L37 17.573v2.375h-2.766l-1.47-1.622-1.46 1.628-9.292-.02Z" /><path fill="#006FCF" d="M23.013 19.012v-6.57h5.572v1.513h-3.768v1.028h3.678v1.488h-3.678v1.01h3.768v1.531h-5.572Z" /><path fill="#006FCF" d="m28.557 19.012 3.083-3.289-3.083-3.282h2.386l1.884 2.083 1.89-2.082H37v.051l-3.017 3.23L37 18.92v.093h-2.307l-1.917-2.103-1.898 2.104h-2.321Z" /><path fill="#FFF" d="M22.71 4.04h3.614l1.269 2.881V4.04h4.46l.77 2.159.771-2.159H37v8.421H19l3.71-8.421Z" /><path fill="#006FCF" d="m23.395 4.955-2.916 6.566h2l.55-1.315h2.98l.55 1.315h2.05l-2.904-6.566h-2.31Zm.25 3.777.875-2.09.873 2.09h-1.748Z" /><path fill="#006FCF" d="M28.581 11.52V4.953l2.811.01L32.84 9l1.456-4.046H37v6.565l-1.74.016v-4.51l-1.644 4.494h-1.59L30.35 7.01v4.51h-1.768Z" />
                              </svg>
                              
                              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" role="img" x={0} y={0} width={38} height={24} viewBox="0 0 165.521 105.965" xmlSpace="preserve" aria-labelledby="pi-apple_pay">
                              <title id="pi-apple_pay">Apple Pay</title><path fill="#000" d="M150.698 0H14.823c-.566 0-1.133 0-1.698.003-.477.004-.953.009-1.43.022-1.039.028-2.087.09-3.113.274a10.51 10.51 0 0 0-2.958.975 9.932 9.932 0 0 0-4.35 4.35 10.463 10.463 0 0 0-.975 2.96C.113 9.611.052 10.658.024 11.696a70.22 70.22 0 0 0-.022 1.43C0 13.69 0 14.256 0 14.823v76.318c0 .567 0 1.132.002 1.699.003.476.009.953.022 1.43.028 1.036.09 2.084.275 3.11a10.46 10.46 0 0 0 .974 2.96 9.897 9.897 0 0 0 1.83 2.52 9.874 9.874 0 0 0 2.52 1.83c.947.483 1.917.79 2.96.977 1.025.183 2.073.245 3.112.273.477.011.953.017 1.43.02.565.004 1.132.004 1.698.004h135.875c.565 0 1.132 0 1.697-.004.476-.002.952-.009 1.431-.02 1.037-.028 2.085-.09 3.113-.273a10.478 10.478 0 0 0 2.958-.977 9.955 9.955 0 0 0 4.35-4.35c.483-.947.789-1.917.974-2.96.186-1.026.246-2.074.274-3.11.013-.477.02-.954.022-1.43.004-.567.004-1.132.004-1.699V14.824c0-.567 0-1.133-.004-1.699a63.067 63.067 0 0 0-.022-1.429c-.028-1.038-.088-2.085-.274-3.112a10.4 10.4 0 0 0-.974-2.96 9.94 9.94 0 0 0-4.35-4.35A10.52 10.52 0 0 0 156.939.3c-1.028-.185-2.076-.246-3.113-.274a71.417 71.417 0 0 0-1.431-.022C151.83 0 151.263 0 150.698 0z" /><path fill="#FFF" d="M150.698 3.532l1.672.003c.452.003.905.008 1.36.02.793.022 1.719.065 2.583.22.75.135 1.38.34 1.984.648a6.392 6.392 0 0 1 2.804 2.807c.306.6.51 1.226.645 1.983.154.854.197 1.783.218 2.58.013.45.019.9.02 1.36.005.557.005 1.113.005 1.671v76.318c0 .558 0 1.114-.004 1.682-.002.45-.008.9-.02 1.35-.022.796-.065 1.725-.221 2.589a6.855 6.855 0 0 1-.645 1.975 6.397 6.397 0 0 1-2.808 2.807c-.6.306-1.228.511-1.971.645-.881.157-1.847.2-2.574.22-.457.01-.912.017-1.379.019-.555.004-1.113.004-1.669.004H14.801c-.55 0-1.1 0-1.66-.004a74.993 74.993 0 0 1-1.35-.018c-.744-.02-1.71-.064-2.584-.22a6.938 6.938 0 0 1-1.986-.65 6.337 6.337 0 0 1-1.622-1.18 6.355 6.355 0 0 1-1.178-1.623 6.935 6.935 0 0 1-.646-1.985c-.156-.863-.2-1.788-.22-2.578a66.088 66.088 0 0 1-.02-1.355l-.003-1.327V14.474l.002-1.325a66.7 66.7 0 0 1 .02-1.357c.022-.792.065-1.717.222-2.587a6.924 6.924 0 0 1 .646-1.981c.304-.598.7-1.144 1.18-1.623a6.386 6.386 0 0 1 1.624-1.18 6.96 6.96 0 0 1 1.98-.646c.865-.155 1.792-.198 2.586-.22.452-.012.905-.017 1.354-.02l1.677-.003h135.875" /><g><g><path fill="#000" d="M43.508 35.77c1.404-1.755 2.356-4.112 2.105-6.52-2.054.102-4.56 1.355-6.012 3.112-1.303 1.504-2.456 3.959-2.156 6.266 2.306.2 4.61-1.152 6.063-2.858" /><path fill="#000" d="M45.587 39.079c-3.35-.2-6.196 1.9-7.795 1.9-1.6 0-4.049-1.8-6.698-1.751-3.447.05-6.645 2-8.395 5.1-3.598 6.2-.95 15.4 2.55 20.45 1.699 2.5 3.747 5.25 6.445 5.151 2.55-.1 3.549-1.65 6.647-1.65 3.097 0 3.997 1.65 6.696 1.6 2.798-.05 4.548-2.5 6.247-5 1.95-2.85 2.747-5.6 2.797-5.75-.05-.05-5.396-2.101-5.446-8.251-.05-5.15 4.198-7.6 4.398-7.751-2.399-3.548-6.147-3.948-7.447-4.048" /></g><g><path fill="#000" d="M78.973 32.11c7.278 0 12.347 5.017 12.347 12.321 0 7.33-5.173 12.373-12.529 12.373h-8.058V69.62h-5.822V32.11h14.062zm-8.24 19.807h6.68c5.07 0 7.954-2.729 7.954-7.46 0-4.73-2.885-7.434-7.928-7.434h-6.706v14.894z" /><path fill="#000" d="M92.764 61.847c0-4.809 3.665-7.564 10.423-7.98l7.252-.442v-2.08c0-3.04-2.001-4.704-5.562-4.704-2.938 0-5.07 1.507-5.51 3.82h-5.252c.157-4.86 4.731-8.395 10.918-8.395 6.654 0 10.995 3.483 10.995 8.89v18.663h-5.38v-4.497h-.13c-1.534 2.937-4.914 4.782-8.579 4.782-5.406 0-9.175-3.222-9.175-8.057zm17.675-2.417v-2.106l-6.472.416c-3.64.234-5.536 1.585-5.536 3.95 0 2.288 1.975 3.77 5.068 3.77 3.95 0 6.94-2.522 6.94-6.03z" /><path fill="#000" d="M120.975 79.652v-4.496c.364.051 1.247.103 1.715.103 2.573 0 4.029-1.09 4.913-3.899l.52-1.663-9.852-27.293h6.082l6.863 22.146h.13l6.862-22.146h5.927l-10.216 28.67c-2.34 6.577-5.017 8.735-10.683 8.735-.442 0-1.872-.052-2.261-.157z" /></g></g>
                              </svg>

                              <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" width={38} height={24} aria-labelledby="pi-google_pay">
                              <title id="pi-google_pay">Google Pay</title>
                              <path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#000" opacity=".07" /><path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#FFF" /><path d="M18.093 11.976v3.2h-1.018v-7.9h2.691a2.447 2.447 0 0 1 1.747.692 2.28 2.28 0 0 1 .11 3.224l-.11.116c-.47.447-1.098.69-1.747.674l-1.673-.006zm0-3.732v2.788h1.698c.377.012.741-.135 1.005-.404a1.391 1.391 0 0 0-1.005-2.354l-1.698-.03zm6.484 1.348c.65-.03 1.286.188 1.778.613.445.43.682 1.03.65 1.649v3.334h-.969v-.766h-.049a1.93 1.93 0 0 1-1.673.931 2.17 2.17 0 0 1-1.496-.533 1.667 1.667 0 0 1-.613-1.324 1.606 1.606 0 0 1 .613-1.336 2.746 2.746 0 0 1 1.698-.515c.517-.02 1.03.093 1.49.331v-.208a1.134 1.134 0 0 0-.417-.901 1.416 1.416 0 0 0-.98-.368 1.545 1.545 0 0 0-1.319.717l-.895-.564a2.488 2.488 0 0 1 2.182-1.06zM23.29 13.52a.79.79 0 0 0 .337.662c.223.176.5.269.785.263.429-.001.84-.17 1.146-.472.305-.286.478-.685.478-1.103a2.047 2.047 0 0 0-1.324-.374 1.716 1.716 0 0 0-1.03.294.883.883 0 0 0-.392.73zm9.286-3.75l-3.39 7.79h-1.048l1.281-2.728-2.224-5.062h1.103l1.612 3.885 1.569-3.885h1.097z" fill="#5F6368" /><path d="M13.986 11.284c0-.308-.024-.616-.073-.92h-4.29v1.747h2.451a2.096 2.096 0 0 1-.9 1.373v1.134h1.464a4.433 4.433 0 0 0 1.348-3.334z" fill="#4285F4" /><path d="M9.629 15.721a4.352 4.352 0 0 0 3.01-1.097l-1.466-1.14a2.752 2.752 0 0 1-4.094-1.44H5.577v1.17a4.53 4.53 0 0 0 4.052 2.507z" fill="#34A853" /><path d="M7.079 12.05a2.709 2.709 0 0 1 0-1.735v-1.17H5.577a4.505 4.505 0 0 0 0 4.075l1.502-1.17z" fill="#FBBC04" /><path d="M9.629 8.44a2.452 2.452 0 0 1 1.74.68l1.3-1.293a4.37 4.37 0 0 0-3.065-1.183 4.53 4.53 0 0 0-4.027 2.5l1.502 1.171a2.715 2.715 0 0 1 2.55-1.875z" fill="#EA4335" />
                              </svg>

                              <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width={38} height={24} aria-labelledby="pi-master">
                              <title id="pi-master">Mastercard</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" /><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" /><circle fill="#EB001B" cx={15} cy={12} r={7} /><circle fill="#F79E1B" cx={23} cy={12} r={7} /><path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z" />
                              </svg>
                         </div>
                         </div>
                         
                         <ul className="delivery-details d-flex flex-column my-2">
                              <li className='d-flex align-items-center gap-2' ><i className="fa-regular fa-credit-card" width={25}></i>Localized Currencies and Payments.</li>
                              <li className='d-flex align-items-center gap-2'  ><i className="fa-solid fa-truck-ramp-box" width={25}></i>Fast, Secure and Tracked DPD Delivery.</li>
                              <li className='d-flex align-items-center gap-2'  ><i className="fa-brands fa-whatsapp" width={25} style={{fontSize : "22px"}}></i>WhatsApp Support Available.</li>
                         </ul>
                         <div className="unboxing-exp  bg-dark">
                              <div className='image' ></div>
                              <div className='textt'>
                                   <h4 className='text-light'>Your Unboxing Experience</h4>
                                   <p className='text-light'>Our exclusive Mercedes-AMG F1 packaging is tailored to each product, featuring various formats to ensure your purchase is protected and secure.</p>
                              </div>
                         </div>
                         

                    </div>
                    <hr className='bold' />
                    <div className="description">
                    <a data-bs-toggle="collapse" href="#collapseDescription" role="button" aria-expanded="false" aria-controls="collapseDescription" className=' d-flex justify-centent-between align-items-center gap-2'>Description 
                         <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 5">
                         <path d="M2.56699 4.25c.19245.33333.67357.33333.86602 0l1.73205-3C5.35751.916667 5.11695.5 4.73205.5h-3.4641C.883049.5.642487.916667.834937 1.25l1.732053 3Z" fill="currentColor" />
                         </svg>
                    </a>
                         <div className="collapse " id='collapseDescription'>
                              <div className='collapse-container'>
                              <p>{description}</p>
                              </div>
                         </div>
                         <hr />
                    <a data-bs-toggle="collapse" href="#collapseMerchandise" role="button" aria-expanded="false" aria-controls="collapseMerchandise" className=' d-flex justify-centent-between align-items-center gap-2'>Official Merchandise 
                         <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 5">
                         <path d="M2.56699 4.25c.19245.33333.67357.33333.86602 0l1.73205-3C5.35751.916667 5.11695.5 4.73205.5h-3.4641C.883049.5.642487.916667.834937 1.25l1.732053 3Z" fill="currentColor" />
                         </svg>
                    </a>
                         <div className="collapse " id='collapseMerchandise'>
                              <div className='collapse-container'>
                              <p>Official Licensed Mercedes-AMG Petronas Formula One Team Merchandise.</p>
                              <p>Ordering from the Official Store means you`re purchasing directly from the Team, ensuring that you receive 100% authentic merchandise.</p>
                              </div>
                         </div>
                    </div>
          </div>
     </div>
     <section className="subscribe d-flex justify-content-between align-items-center flex-column">
      <SubscribeSec></SubscribeSec>
    </section>
    <div className="trending-body">
        <TrendingSlider></TrendingSlider>
      </div>
    </div>
    </>
  )
}

export default ProductDetails