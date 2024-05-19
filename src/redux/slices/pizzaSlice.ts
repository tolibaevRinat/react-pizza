import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { FetchPizzasArgs, Meta, PizzaSliceState, PizzasItems, Status } from './types/pizzaTypes';

const URL = `https://d474bb3f37b7cb09.mokky.dev/items`;

export const fetchPizzas = createAsyncThunk(
   'pizza/fetchPizzasTatus',
   async (params: FetchPizzasArgs) => {
      const { sort, category, title, currentPage } = params;
      const { data } = await axios.get(
         `${URL}?${sort}${category}${title}&page=${currentPage}&limit=4`,
      );

      const response = {
         items: data.items as PizzasItems[],
         meta: data.meta as Meta,
      };

      return response;
   },
);

const initialState: PizzaSliceState = {
   currentPage: 1,
   pizzas: [],
   meta: {
      current_page: 1,
      per_page: 0,
      remaining_count: 0,
      total_items: 0,
      total_pages: 0,
   },
   status: Status.LOADING, // 'loading' | 'success' | 'error'
};

const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {
      setPageNumber(state, action) {
         state.currentPage = action.payload + 1;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchPizzas.pending, (state) => {
         state.status = Status.LOADING;
         state.pizzas = [];
         state.meta = {
            current_page: 1,
            per_page: 0,
            remaining_count: 0,
            total_items: 0,
            total_pages: 0,
         };
      });
      builder.addCase(fetchPizzas.fulfilled, (state, action) => {
         state.pizzas = action.payload.items;
         state.meta = action.payload.meta;
         state.status = Status.SUCCESS;
      });
      builder.addCase(fetchPizzas.rejected, (state) => {
         state.status = Status.ERROR;
         state.pizzas = [];
         state.meta = {
            current_page: 1,
            per_page: 0,
            remaining_count: 0,
            total_items: 0,
            total_pages: 0,
         };
      });
   },
});

export const getPizzaSelector = (state: RootState) => state.pizza;

export const { setPageNumber } = pizzaSlice.actions;
export default pizzaSlice.reducer;
