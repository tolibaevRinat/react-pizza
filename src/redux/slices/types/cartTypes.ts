export type CartItems = {
   id: number;
   images: {
      avif: '';
      webp: '';
      jpg: '';
   };
   title: string;
   type: string;
   size: number;
   price: number;
   count: number;
};

export interface cartSliceState {
   totalPrice: number;
   items: CartItems[];
}
