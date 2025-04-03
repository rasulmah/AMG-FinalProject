import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import supabase from '../../utils/supabase';

const initialState = {
     categories : [],
     selectedCategory : {},
     loading : false
}

export const getAllCategories = createAsyncThunk("getAllCategories", async()=>{
     const response = await supabase.from('category-banners').select();
     return response.data
})

export const caregorySlice = createSlice({
     name: 'category',
     initialState,
     reducers:{

     },
     extraReducers: (builder) => {
          builder.addCase(getAllCategories.pending, (state) => {
               state.loading = true;
          })
          builder.addCase(getAllCategories.fulfilled, (state,action)=>{
               state.loading =false;
               state.categories = action.payload
          })
     }
})

export const {setSelectedCategory} = caregorySlice.actions
export default caregorySlice.reducer