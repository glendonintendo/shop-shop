import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  cartOpen: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add(state, action) {
      state.cart.push(action.payload);
      state.cartOpen = true;
    },
    addMultiple(state, action) {
      state.cart.push(...action.payload);
    },
    remove(state, action) {
      const newCartState = state.cart.filter(product => product._id !== action.payload);
      state.cart = newCartState;
      state.cartOpen = newCartState.length > 0;
    },
    updateQuantity(state, action) {
      state.cart = state.cart.map(product => {
        if (product._id === action.payload._id) {
          product.purchaseQuantity = action.payload.purchaseQuantity;
        }
        return product;
      });
      state.cartOpen = true;
    },
    clear(state) {
      state.cart = [];
      state.cartOpen = false;
    },
    toggle(state) {
      state.cartOpen = !state.cartOpen;
    }
  }
});

export const { add, addMultiple, remove, updateQuantity, clear, toggle } = cartSlice.actions;

export default cartSlice.reducer;