import React from 'react';

import { useDispatch } from 'react-redux';
import { addItem, minusItem, removeItem } from '../redux/slices/cartSlice';
import { CartItems } from '../redux/slices/types/cartTypes';

type CartItemProps = {
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

export const CartItem: React.FC<CartItemProps> = ({
   id,
   images,
   title,
   type,
   size,
   price,
   count,
}) => {
   const dispatch = useDispatch();

   function onClickPlus() {
      dispatch(addItem({ id } as CartItems));
   }
   function onClickMinus() {
      dispatch(minusItem(id));
   }
   function onClickRemove() {
      dispatch(removeItem(id));
   }
   return (
      <li>
         <article className='cart-list__item flex al-c jus-b gap-20'>
            <div className='cart-list__info flex al-c grow'>
               <picture>
                  <source srcSet={images.avif} type='image/avif' />
                  <source srcSet={images.webp} type='image/webp' />
                  <img className='cart-list__img' src={images.jpg} alt='Пицца' />
               </picture>
               <div className='cart-list__titles'>
                  <h2 className='cart-list__title price'>{title}</h2>
                  <span className='cart-list__descr'>
                     {type}, {size} см.
                  </span>
               </div>
            </div>
            <div className='cart-list__actions flex al-c'>
               <div className='cart-list__counts flex al-c'>
                  <button
                     onClick={onClickMinus}
                     disabled={count === 1}
                     className='cart-list__btn flex f-center radius-50 btn'
                     type='button'
                  >
                     <svg
                        className='cart-list__icon'
                        width='10'
                        height='2'
                        viewBox='0 0 10 2'
                        xmlns='http://www.w3.org/2000/svg'
                     >
                        <path d='M4.04019 0.0399933H8.84019C9.37035 0.0399933 9.80019 0.469833 9.80019 0.999993C9.80019 1.53015 9.37035 1.95999 8.84019 1.95999H4.04019H1.1602C0.630035 1.95999 0.200195 1.53015 0.200195 0.999993C0.200195 0.469833 0.630035 0.0399933 1.1602 0.0399933H4.04019Z' />
                     </svg>
                  </button>
                  <span className='price'>{count}</span>
                  <button
                     onClick={onClickPlus}
                     className='cart-list__btn flex f-center radius-50 btn'
                     type='button'
                  >
                     <svg
                        className='cart-list__icon'
                        width='12'
                        height='12'
                        viewBox='0 0 12 12'
                        xmlns='http://www.w3.org/2000/svg'
                     >
                        <path d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z' />
                     </svg>
                  </button>
               </div>
               <div className='cart-list__price price'>{price * count} ₽ </div>
               <button onClick={onClickRemove} className='cart-list__delete btn' type='button'>
                  <svg
                     width='32'
                     height='32'
                     viewBox='0 0 32 32'
                     xmlns='http://www.w3.org/2000/svg'
                  >
                     <circle cx='16' cy='16' r='15' strokeWidth='2' />
                     <path d='M19.7479 17.9557L17.4993 15.7071L19.7479 13.4585C20.1618 13.0446 20.1618 12.3734 19.7479 11.9595C19.334 11.5455 18.6628 11.5455 18.2488 11.9595L16.0002 14.2081L13.7516 11.9595C13.3377 11.5455 12.6665 11.5455 12.2526 11.9595C11.8386 12.3734 11.8386 13.0446 12.2526 13.4585L14.5012 15.7071L12.2526 17.9557C11.8386 18.3697 11.8386 19.0409 12.2526 19.4548C12.6665 19.8687 13.3377 19.8687 13.7516 19.4548L16.0002 17.2062L18.2488 19.4548C18.6628 19.8687 19.334 19.8687 19.7479 19.4548C20.1618 19.0409 20.1618 18.3697 19.7479 17.9557Z' />
                  </svg>
               </button>
            </div>
         </article>
      </li>
   );
};
