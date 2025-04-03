import { createSlice } from '@reduxjs/toolkit'

const getBasketFromStorage = () => {
  if (localStorage.getItem("basket")) {
    return JSON.parse(localStorage.getItem("basket"))
  } else {
    return []
  }
}

const initialProducts = getBasketFromStorage();
const initialState = {
  products: initialProducts,
  totalAmount: initialProducts.reduce((total, product) => total + product.price * product.count, 0)
}

const writeFromBasketToStorage = (basket) => {
  localStorage.setItem("basket", JSON.stringify(basket))
}

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const findProduct = state.products.find((product) => product.id === action.payload.id);
      if (findProduct) {
        const extractedProducts = state.products.filter((product) => product.id !== action.payload.id);
        findProduct.count += action.payload.count;
        state.products = [...extractedProducts, findProduct];
        writeFromBasketToStorage(state.products);
      } else {
        state.products = [...state.products, action.payload];
        writeFromBasketToStorage(state.products);
      }
      state.totalAmount = state.products.reduce((total, product) => total + product.price * product.count, 0);
    },
    calculateBasket: (state) => {
      state.totalAmount = state.products.reduce((total, product) => total + product.price * product.count, 0);
    },
    removeFromBasket: (state, action) => {
      state.products = state.products.filter((item) => item.id !== action.payload);
      writeFromBasketToStorage(state.products);
      state.totalAmount = state.products.reduce((total, product) => total + product.price * product.count, 0);
    },
    clearBasket: (state) => {
      state.products = [];
      state.totalAmount = 0;
      localStorage.removeItem("basket");
    }
  }
})

export const { addToBasket, calculateBasket, removeFromBasket, clearBasket } = basketSlice.actions
export default basketSlice.reducer