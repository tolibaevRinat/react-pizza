import { CartItems } from '../redux/slices/cartSlice';

export function calcTotalPrice(items: CartItems[]) {
   return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
}
