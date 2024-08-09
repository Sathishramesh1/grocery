import { configureStore } from '@reduxjs/toolkit';
import productSlice from './productSlice';
import cartSlice from './cartSlice';
import {thunk} from 'redux-thunk';


export const store = configureStore({
 reducer: {
    cart: cartSlice,
    product: productSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})