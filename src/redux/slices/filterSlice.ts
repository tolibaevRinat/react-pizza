import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { FilterSliceState, SortItems } from './types/filterTypes';

const initialState: FilterSliceState = {
   searchValue: '',
   categoryId: 0,
   sort: {
      value: 'Популярные',
      id: 0,
      type: '-rating',
   },
};

const filterSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      setActiveCategory(state, action: PayloadAction<number>) {
         state.categoryId = action.payload;
      },
      setSortValue(state, action: PayloadAction<SortItems>) {
         state.sort = action.payload;
      },
      setSearchValue(state, action: PayloadAction<string>) {
         state.searchValue = action.payload;
      },
      setFilters(state, action: PayloadAction<FilterSliceState>) {
         state.categoryId = +action.payload.categoryId;
         state.sort = action.payload.sort;
      },
   },
});

export const filterSelector = (state: RootState) => state.filter;
export const filterSortSelector = (state: RootState) => state.filter.sort;
export const filterCategoryIdSelector = (state: RootState) => state.filter.categoryId;

export const { setActiveCategory, setSortValue, setSearchValue, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
