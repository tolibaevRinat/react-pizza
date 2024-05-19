export type FetchPizzasArgs = {
   sort: string;
   category: string;
   title: string;
   currentPage: number;
};
export type PizzasItems = {
   id: number;
   images: {
      avif: '';
      webp: '';
      jpg: '';
   };
   title: string;
   types: number[];
   sizes: number[];
   price: number;
};
export type Meta = {
   current_page: number;
   per_page: number;
   remaining_count: number;
   total_items: number;
   total_pages: number;
};
export enum Status {
   LOADING = 'loading',
   SUCCESS = 'success',
   ERROR = 'error',
}
export interface PizzaSliceState {
   currentPage: number;
   pizzas: PizzasItems[];
   meta: Meta;
   status: Status;
}
