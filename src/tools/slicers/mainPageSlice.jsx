import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import supabase from '../../utils/supabase';

const initialState = {
     elements : [],
     selectedElement : {},
     loading : false
}

export const getAllMainPageElements = createAsyncThunk("getAllMainPageElmenets", async()=>{
     const response =await supabase.from('mainsection').select();
     return response.data
})

export const mainPageSlice = createSlice({
     name: 'element',
     initialState,
     reducers:{

     }, 
     extraReducers: (builder) =>{
          builder.addCase(getAllMainPageElements.pending, (state) => {
               state.loading = true;
          })
          builder.addCase(getAllMainPageElements.fulfilled, (state,action)=>{
               state.loading = false;
               state.elements = action.payload
          })
     }
})

export const {setSelectedElement} = mainPageSlice.actions
export default mainPageSlice.reducer