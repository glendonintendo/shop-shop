import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  currentCategory: ''
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    update(state, action) {
      state.categories = action.payload;
    },
    updateCurrent(state, action) {
      state.currentCategory = action.payload;
    }
  }
});

export const { update, updateCurrent } = categoriesSlice.actions;

export default categoriesSlice.reducer;