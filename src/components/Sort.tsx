import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { filterSortSelector, setSortValue } from '../redux/slices/filterSlice';
import { SortItems } from '../redux/slices/types/filterTypes';

export const sortTypes: SortItems[] = [
   { value: 'Популярные', id: 0, type: '-rating' },
   { value: 'Подороже', id: 1, type: '-price' },
   { value: 'Подешевле', id: 2, type: 'price' },
   { value: 'По алфавиту', id: 3, type: 'title' },
];

export const Sort: React.FC = React.memo(() => {
   const [active, setActive] = React.useState(false);
   const [activeType, setActiveType] = React.useState(0);
   const sortRef = React.useRef<HTMLDivElement>(null);

   const sortValue = useSelector(filterSortSelector);
   const dispatch = useDispatch();

   function changeSortItem(sortType: SortItems, id: number) {
      dispatch(setSortValue(sortType));
      setActiveType(id);
      setActive(false);
   }

   React.useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
         if (sortRef.current && !event.composedPath().includes(sortRef.current)) setActive(false);
      }

      document.body.addEventListener('click', handleClickOutside);

      return () => document.removeEventListener('click', handleClickOutside);
   }, []);

   return (
      <div ref={sortRef} className={`sort rel ${active ? 'active' : ''}`}>
         <button
            onClick={() => setActive(!active)}
            className='sort__content flex al-c f-700'
            type='button'
         >
            <img className='sort__icon' src='icons/triangle.svg' alt=' ' />
            <div className='sort__text'>Сортировка по:</div>
            <span>{sortValue.value}</span>
         </button>
         <ul className='sort__list radius-10 z-50'>
            {sortTypes.map((sortType) => (
               <li key={sortType.id}>
                  <button
                     onClick={() => changeSortItem(sortType, sortType.id)}
                     className={`sort__btn f-700 ${activeType === sortType.id ? 'active' : ''}`}
                  >
                     {sortType.value}
                  </button>
               </li>
            ))}
         </ul>
      </div>
   );
});
