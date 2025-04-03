import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../utils/supabase'; // Assuming you have a supabase instance setup

// Fetch sales data from Supabase
export const fetchSalesData = createAsyncThunk('dashboard/fetchSalesData', async () => {
  const { data, error } = await supabase.from('sales').select('quantity_sold, total_amount');
  if (error) throw error;
  return data;
});

const initialState = {
  salesData: [],
  totalSales: 0,
  totalRevenue: 0,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Optionally, you can add additional reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSalesData.fulfilled, (state, action) => {
        state.salesData = action.payload;
        state.totalSales = action.payload.reduce((total, item) => total + item.quantity_sold, 0);
        state.totalRevenue = action.payload.reduce((total, item) => total + item.total_amount, 0);
        state.loading = false;
      })
      .addCase(fetchSalesData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});


export default dashboardSlice.reducer;
