import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { filterCategoryIdSelector, setActiveCategory } from '../redux/slices/filterSlice';

const categoriesValues = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories: React.FC = React.memo(() => {
   const categoryId = useSelector(filterCategoryIdSelector);
   const dispatch = useDispatch();

   return (
      <ul className='categories flex al-c gap-10 f-wrap grow'>
         {categoriesValues.map((categoriesValue, index) => (
            <li key={index}>
               <button
                  onClick={() => dispatch(setActiveCategory(index))}
                  className={`categories__btn btn f-700 flex f-center radius-30 ${
                     categoryId === index ? 'active' : ''
                  }`}
                  type='button'
               >
                  {categoriesValue}
               </button>
            </li>
         ))}
      </ul>
   );
});
