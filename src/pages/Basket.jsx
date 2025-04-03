import  'react'
import { useDispatch, useSelector } from 'react-redux'
import { calculateBasket, removeFromBasket } from '../tools/slicers/basketSlice'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import '../assets/scss/pages/_cart.scss'
import TrendingSlider from '../components/Sliders/TrendingSlider'

const Basket = () => {
  const { products, totalAmount } = useSelector((store) => store.basket)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateBasket())
  }, [])

  return (
    <div className='cart-container'>
      <div className="products-cart-section">
        {products.length === 0 ? (
          <div>
          <div className="empty-basket">
            <p className='mb-4'>Add something to the basket!</p>
            <NavLink to="/products" className="d-flex justify-content-center align-items-center">
              <button className="checkout btn btn-primary">
                Go to Products
              </button>
            </NavLink>
          </div>
          <h2 className='text-light text-center py-5 h1 fw-medium'>Maybe try these...</h2>
          <TrendingSlider></TrendingSlider>
          </div>
        ) : (
          <div className='cart-card-container-basket'>
            {products.map((product) => (
              <div className='cart-card' key={product.id}>
                <div className="cart-img-container" style={{ backgroundImage: `url(${product.img})` }}></div>

                <div className="product-details">
                  <h3 className="product-title">{product.title}</h3>
                  <div className="price-info">
                    <span className="price">{product.price.toFixed(2)} AZN</span>
                    <span className="multiply">X</span>
                    <span className="quantity">{product.count}</span>
                  </div>
                </div>

                <div className="actions">
                  <button 
                    onClick={() => dispatch(removeFromBasket(product.id))}
                    className='delete-btn'
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v7H9v-7zm4 0h2v7h-2v-7zM9 4v2h6V4H9z"/>
                    </svg>
                  </button>
                  <div className="total-price">
                    {(product.price * product.count).toFixed(2)} AZN
                  </div>
                </div>
              </div>
            ))}

            <div className="checkout-section">
              <div className="total-amount">
                Total Amount: {totalAmount.toFixed(2)} AZN
              </div>
              <NavLink to="/checkout">
                <button className="checkout">
                  Checkout
                </button>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Basket