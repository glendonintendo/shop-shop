import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  currentCategory: ''
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    updateCategories(state, action) {
      state.categories = action.payload;
    },
    updateCurrentCategory(state, action) {
      state.currentCategory = action.payload;
    }
  }
});

export const { updateCategories, updateCurrentCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;