import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { CartItem } from '../components';
import { clearItem, getItemsSelector } from '../redux/slices/cartSlice';
import CartEmpty from './CartEmpty';
import { CartItems } from '../redux/slices/types/cartTypes';

const Cart: React.FC = () => {
   const items = useSelector(getItemsSelector);
   const dispatch = useDispatch();

   const totalCount = items.reduce((sum: number, item: CartItems) => item.count + sum, 0);
   const totalPrice = items.reduce(
      (sum: number, item: CartItems) => item.price * item.count + sum,
      0,
   );

   function onClickClear() {
      dispatch(clearItem());
   }

   if (!totalCount) {
      return <CartEmpty />;
   }

   return (
      <section className='cart'>
         <div className='cart__top flex al-c jus-b gap-20'>
            <div className='cart__tile flex al-c gap-10'>
               <img src='icons/big-cart.svg' alt=' ' />
               <h1 className='cart__title title'>Корзина</h1>
            </div>
            <button onClick={onClickClear} className='cart__clear flex al-c gap-5' type='button'>
               <img src='icons/bin.svg' alt=' ' />
               <span>Очистить корзину</span>
            </button>
         </div>
         <ul className='cart-list'>
            {items.map((item: CartItems) => (
               <CartItem key={item.id} {...item} />
            ))}
         </ul>
         <footer className='cart-footer'>
            <div className='cart-footer__top flex al-c jus-b gap-20 f-wrap'>
               <div className='cart-footer__total'>
                  Всего пицц: <span className='price'>{totalCount} шт.</span>
               </div>
               <div className='cart-footer__total'>
                  Сумма заказа: <span className='price price--yellow'>{totalPrice} ₽</span>
               </div>
            </div>
            <div className='cart-footer__bottom flex al-c jus-b gap-20 f-wrap'>
               <Link
                  to='/'
                  className='cart-footer__btn cart-footer__btn--back btn radius-30 flex f-center gap-10'
               >
                  <svg width='8' height='14' viewBox='0 0 8 14' xmlns='http://www.w3.org/2000/svg'>
                     <path
                        fill='none'
                        d='M7 13L1 6.93015L6.86175 1'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                     />
                  </svg>
                  Вернуться назад
               </Link>
               <button className='cart-footer__btn cart-footer__btn--pay btn radius-30 flex f-center f-700'>
                  Оплатить сейчас
               </button>
            </div>
         </footer>
      </section>
   );
};

export default Cart;
