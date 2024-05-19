import React from 'react';
import { Link } from 'react-router-dom';

const CartEmpty: React.FC = () => {
   return (
      <section className='cart-empty t-al-center flex f-d-col al-c'>
         <h1 className='title cart-empty__title'>Корзина пустая </h1>
         <p className='cart-empty__text'>
            Вероятней всего, вы не заказывали ещё пиццу.
            <br /> Для того, чтобы заказать пиццу, перейди на главную страницу.
         </p>
         <img className='cart-empty__img' src='cart-empty.svg' alt=' ' />
         <Link to='/' className='cart-empty__link radius-30 flex f-center f-700'>
            Вернуться назад
         </Link>
      </section>
   );
};

export default CartEmpty;
