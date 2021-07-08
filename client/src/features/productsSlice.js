import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProducts(state, action) {
      state = action.payload;
    }
  }
});

export const { updateProducts } = productsSlice.actions;

export default productsSlice.reducer;