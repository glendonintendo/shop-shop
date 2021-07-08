import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  cartOpen: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
      state.cartOpen = true;
    },
    addMultipleToCart(state, action) {
      state.cart.push(...action.payload);
    },
    removeFromCart(state, action) {
      const newCartState = state.cart.filter(product => product._id !== action.payload);
      state.cart = newCartState;
      state.cartOpen = newCartState.length > 0;
    },
    updateProductQuantityInCart(state, action) {
      state.cart = state.cart.map(product => {
        if (product._id === action.payload._id) {
          product.purchaseQuantity = action.payload.purchaseQuantity;
        }
        return product;
      });
      state.cartOpen = true;
    },
    clearCart(state) {
      state.cart = [];
      state.cartOpen = false;
    },
    toggleCart(state) {
      state.cartOpen = !state.cartOpen;
    }
  }
});

export const { addToCart, addMultipleToCart, removeFromCart, updateProductQuantityInCart, clearCart, toggleCart } = cartSlice.actions;

export default cartSlice.reducer;