import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getItemsFromLS } from '../../utils/getItemsFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { CartItems, cartSliceState } from './types/cartTypes';

const { totalPrice, items } = getItemsFromLS();

const initialState: cartSliceState = {
   totalPrice,
   items,
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem(state, action: PayloadAction<CartItems>) {
         const findItem = state.items.find((obj) => obj.id === action.payload.id);

         if (findItem) {
            findItem.count++;
         } else {
            state.items.push({
               ...action.payload,
               count: 1,
            });
         }

         state.totalPrice = calcTotalPrice(state.items);
      },
      minusItem(state, action: PayloadAction<number>) {
         const findItem = state.items.find((obj) => obj.id === action.payload);
         if (findItem && findItem.count > 1) findItem.count--;
      },
      removeItem(state, action: PayloadAction<number>) {
         state.items = state.items.filter((obj) => obj.id !== action.payload);
      },
      clearItem(state) {
         state.items = [];
         state.totalPrice = 0;
      },
   },
});

export const getItemsSelector = (state: RootState) => state.cart.items;
export const getItemsSelectorById = (id: number) => (state: RootState) =>
   state.cart.items.find((obj) => obj.id === id);

export const getCartSelector = (state: RootState) => state.cart;

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
