import { configureStore } from '@reduxjs/toolkit'
import  appReducer  from '../slicers/appSlice'
import  productReducer  from '../slicers/productSlice'
import driverReducer from '../slicers/driverSlice'
import collectionReducer from '../slicers/collectionSlice'
import mainPageReducer from '../slicers/mainPageSlice'
import  caregoryReducer from '../slicers/categoryBannersSlice'
import basketReducer from '../slicers/basketSlice'
import wishlistReducer from '../slicers/wishlistSlice'
import paymentReducer from '../slicers/paymentSlice'
import authReducer from '../slicers/authSlice'
import dashboardReducer from '../slicers/dashboardSlice'



export const store = configureStore({
  reducer: {
     app: appReducer,
     product : productReducer, 
     driver : driverReducer,
     collection : collectionReducer,
     element: mainPageReducer,
     category : caregoryReducer,
     basket : basketReducer,
     wishlist : wishlistReducer,
     payment: paymentReducer, 
     auth: authReducer,
     dashboard: dashboardReducer,

  },
})