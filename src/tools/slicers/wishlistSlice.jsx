import { createSlice } from "@reduxjs/toolkit";

// Load wishlist from local storage
const loadWishlist = () => {
  const storedWishlist = localStorage.getItem("wishlist");
  return storedWishlist ? JSON.parse(storedWishlist) : [];
};

const initialState = {
  wishlistProducts: loadWishlist(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const productId = action.payload.id;
      // Strict type comparison
      const exists = state.wishlistProducts.some(item => item.id === productId);
      
      if (!exists) {
        const updatedState = [...state.wishlistProducts, action.payload];
        localStorage.setItem("wishlist", JSON.stringify(updatedState));
        state.wishlistProducts = updatedState;
      }
    },
    removeFromWishlist: (state, action) => {
      // Filter out the item from the wishlist
      const updatedState = state.wishlistProducts.filter(
        (item) => item.id !== action.payload
      );

      // Save the updated wishlist to local storage
      localStorage.setItem("wishlist", JSON.stringify(updatedState));
      state.wishlistProducts = updatedState;
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

