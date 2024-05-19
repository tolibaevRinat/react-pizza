import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addItem, getItemsSelectorById } from '../../redux/slices/cartSlice';
import { CartItems } from '../../redux/slices/types/cartTypes';

type PizzasProps = {
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

export const Pizzas: React.FC<PizzasProps> = ({ id, images, title, types, sizes, price }) => {
   const [selectType, setSelectType] = React.useState(types[0]);
   const [selectSize, setSelectSize] = React.useState(0);

   const cartItem = useSelector(getItemsSelectorById(id));
   const dispatch = useDispatch();

   const addedCount = cartItem ? cartItem.count : 0;

   const typesName = ['тонкое', 'традиционное'];

   function onClickAdd() {
      const item: CartItems = {
         id,
         images,
         title,
         price,
         type: typesName[selectType],
         size: sizes[selectSize],
         count: 0,
      };
      dispatch(addItem(item));
   }

   return (
      <article className='item t-al-center'>
         <picture>
            <source srcSet={images.avif} type='image/avif' />
            <source srcSet={images.webp} type='image/webp' />
            <img className='item__img' src={images.jpg} alt='Пицца' />
         </picture>
         <h3 className='item__title'>{title}</h3>
         <div className='item-actions radius-10 flex f-d-col'>
            <div className='item-actions__row flex al-c gap-5'>
               {types.map((typeId) => (
                  <button
                     key={typeId}
                     onClick={() => setSelectType(typeId)}
                     className={`item-actions__btn radius-5 grow btn f-700 ${
                        selectType === typeId ? 'active' : ''
                     }`}
                  >
                     {typesName[typeId]}
                  </button>
               ))}
            </div>
            <div className='item-actions__row flex al-c gap-5'>
               {sizes.map((size, index) => (
                  <button
                     key={index}
                     onClick={() => setSelectSize(index)}
                     className={`item-actions__btn f-700 radius-5 grow btn ${
                        selectSize === index ? 'active' : ''
                     }`}
                  >
                     {size} см.
                  </button>
               ))}
            </div>
         </div>
         <div className='item__bottom flex al-c jus-b gap-10'>
            <div className='item__price price'>от {price} ₽</div>
            <button onClick={onClickAdd} className='item__btn flex al-c jus-b gap-10 radius-30 btn'>
               <svg
                  className='item__icon'
                  width='12'
                  height='12'
                  viewBox='0 0 12 12'
                  xmlns='http://www.w3.org/2000/svg'
               >
                  <path d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z' />
               </svg>
               <div className='item__text'>Добавить</div>
               {addedCount > 0 && (
                  <span className='item__count flex f-center radius-50'>{addedCount}</span>
               )}
            </button>
         </div>
      </article>
   );
};
