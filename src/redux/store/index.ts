import { configureStore } from '@reduxjs/toolkit';
import likedProductsReducer from '../slices/likedProductsSlice';
import productReducer from '../slices/productSlice';
import currencyReducer from '../slices/currencySlice'; 

const store = configureStore({
  reducer: {
    likedProducts: likedProductsReducer,
    products: productReducer,
    currency: currencyReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
