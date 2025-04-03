import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../utils/supabase';

const initialState = {
  products: [],
  selectedProduct: {},
  loading: false,
};

// Async thunks for interacting with Supabase
export const getAllProducts = createAsyncThunk('getAllProducts', async () => {
  const response = await supabase.from('products').select();
  return response.data;
});

// Add product
export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (newProduct, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([newProduct]);

      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Edit product
export const editProduct = createAsyncThunk(
  'product/editProduct',
  async (updatedProduct, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .upsert(updatedProduct);

      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { data, error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;
      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload[0]); // Push newly added product to the state
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload[0].id
        );
        if (index !== -1) {
          state.products[index] = action.payload[0]; // Update the product in the state
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        ); // Remove the product from the state
      });
  }
});

export const { setSelectedProduct, setLoading } = productSlice.actions;
export default productSlice.reducer;
