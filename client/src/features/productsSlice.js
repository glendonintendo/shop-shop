import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    update(state, action) {
      state = action.payload;
    }
  }
});

export const { update } = productsSlice.actions;

export default productsSlice.reducer;