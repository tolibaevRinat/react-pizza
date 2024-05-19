import { CartItems } from '../redux/slices/cartSlice';
import { calcTotalPrice } from './calcTotalPrice';

export function getItemsFromLS() {
   const data = localStorage.getItem('cart');

   const items: CartItems[] = data ? JSON.parse(data) : [];

   const totalPrice = calcTotalPrice(items);

   return {
      items,
      totalPrice,
   };
}
