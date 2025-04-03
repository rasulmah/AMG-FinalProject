import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import supabase from '../../utils/supabase';

const initialState = {
     collections : [],
     selectedSection : {},
     loading : false
}

export const getAllCollection = createAsyncThunk("getAllCollection", async()=>{
     const response = await supabase.from('new-collections').select();
     return response.data
})

export const collectionSlice = createSlice({
     name: 'collection',
     initialState,
     reducers:{

     },
     extraReducers: (builder) => {
          builder.addCase(getAllCollection.pending, (state) => {
               state.loading = true;
          })
          builder.addCase(getAllCollection.fulfilled, (state,action)=>{
               state.loading =false;
               state.collections = action.payload
          })
     }
})

export const {setSelectedCollection} = collectionSlice.actions
export default collectionSlice.reducer