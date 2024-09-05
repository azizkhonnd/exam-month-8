import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LikedProductsState {
  likedProducts: string[]; 
}

const initialState: LikedProductsState = {
  likedProducts: JSON.parse(localStorage.getItem('likedProducts') || '[]'),
};

const likedProductsSlice = createSlice({
  name: 'likedProducts',
  initialState,
  reducers: {
    addProductToLikes: (state, action: PayloadAction<string>) => {
      if (!state.likedProducts.includes(action.payload)) {
        state.likedProducts.push(action.payload);
        localStorage.setItem('likedProducts', JSON.stringify(state.likedProducts));
      }
    },
    removeProductFromLikes: (state, action: PayloadAction<string>) => {
      state.likedProducts = state.likedProducts.filter((id) => id !== action.payload);
      localStorage.setItem('likedProducts', JSON.stringify(state.likedProducts));
    },
    clearLikedProducts: (state) => {
      state.likedProducts = [];
      localStorage.removeItem('likedProducts');
    },
  },
});

export const { addProductToLikes, removeProductFromLikes, clearLikedProducts } = likedProductsSlice.actions;

export default likedProductsSlice.reducer;
