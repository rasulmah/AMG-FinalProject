import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import supabase from '../../utils/supabase';


const initialState = {
     drivers : [],
     selectedDriver : {},
     loading : false
}

export const getAllDrivers = createAsyncThunk("getAllDrivers", async()=>{
     const response = await supabase.from('drivers').select();
     return response.data
})

export const driverSlice = createSlice({
     name: 'driver',
     initialState,
     reducers:{

     },
     extraReducers : (builder) => {
          builder.addCase(getAllDrivers.pending, (state) => {
               state.loading = true;
          })
          builder.addCase(getAllDrivers.fulfilled, (state,action)=>{
               state.loading =false;
               state.drivers = action.payload
          })
     }
})

export const {setSelectedDriver} = driverSlice.actions
export default driverSlice.reducer