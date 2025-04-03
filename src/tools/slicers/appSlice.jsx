import { createSlice } from "@reduxjs/toolkit"

const initialState = {
     loading : false
}

export const appSlice = createSlice({
     name: 'app',
     initialState,
     reducers  : {

     },
     // eslint-disable-next-line no-unused-vars
     extraReducers : (builder) => {

     }
})

// eslint-disable-next-line no-empty-pattern
export const {} = appSlice.actions
export default appSlice.reducer