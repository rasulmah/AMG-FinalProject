// paymentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  savedCards: []
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    saveCard: (state, action) => {
      state.savedCards.push({
        ...action.payload,
        id: Date.now() 
      });
    }
  }
});

export const { saveCard } = paymentSlice.actions;
export default paymentSlice.reducer;