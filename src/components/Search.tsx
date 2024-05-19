import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import { setSearchValue } from '../redux/slices/filterSlice';

export const Search: React.FC = () => {
   const [value, setValue] = React.useState('');

   const dispatch = useDispatch();

   const inputRef = React.useRef<HTMLInputElement>(null);

   function handleClickClearBtn() {
      setValue('');
      dispatch(setSearchValue(''));
      inputRef.current?.focus();
   }

   const updateSearchValue = React.useCallback(
      debounce((str) => {
         dispatch(setSearchValue(str));
      }, 500),
      [],
   );

   function onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
      setValue(event.target.value);
      updateSearchValue(event.target.value);
   }

   return (
      <div tabIndex={0} className='search flex al-c gap-10 radius-10'>
         <img className='search__icon' src='icons/search.svg' alt=' ' />
         <input
            ref={inputRef}
            value={value}
            onInput={onChangeInput}
            className='search__input'
            placeholder='Поиск Пиццы'
         />
         {value && (
            <button onClick={handleClickClearBtn} className='search__btn' type='button'>
               <img className='search__clear' src='icons/clear.svg' alt=' ' />
            </button>
         )}
      </div>
   );
};
