export type SortItems = {
   value: string;
   id: number;
   type: '-rating' | '-price' | 'price' | 'title';
};

export interface FilterSliceState {
   searchValue: string;
   categoryId: number;
   sort: SortItems;
}
