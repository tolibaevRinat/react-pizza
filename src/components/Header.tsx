import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Search } from './';
import { getCartSelector } from '../redux/slices/cartSlice';
import { CartItems } from '../redux/slices/types/cartTypes';

const Header: React.FC = () => {
   const isMounted = React.useRef(false);

   const { totalPrice, items } = useSelector(getCartSelector);

   const { pathname } = useLocation();

   React.useEffect(() => {
      if (isMounted.current) {
         const json = JSON.stringify(items);
         localStorage.setItem('cart', json);
      }
      isMounted.current = true;
   }, [items]);

   const totalCount = items.reduce((sum: number, item: CartItems) => item.count + sum, 0);

   return (
      <header className='header'>
         <div className='header__wrapper'>
            <div className='container flex jus-b al-c gap-20 f-wrap'>
               <div className='header__main flex al-c gap-30 grow'>
                  <Link className='header__logos flex al-c' to='/'>
                     <img className='header__logo' src='icons/logo.svg' alt='Логотип' />
                     <div className='header__title'>
                        <h1>REACT PIZZA</h1>
                        <span>самая вкусная пицца во вселенной</span>
                     </div>
                  </Link>
                  <Search />
               </div>
               {pathname !== '/cart' && (
                  <Link className='header__cart f-700 radius-30 flex al-c btn' to='/cart'>
                     <div className='header__price rel'>{totalPrice} ₽</div>
                     <div className='header__count flex al-c '>
                        <img src='icons/cart.svg' alt=' ' />
                        <span>{totalCount}</span>
                     </div>
                  </Link>
               )}
            </div>
         </div>
      </header>
   );
};

export default Header;
