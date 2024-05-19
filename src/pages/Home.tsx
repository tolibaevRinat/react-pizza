import React from 'react';
import { useSelector } from 'react-redux';

import { Sort, Categories, Pizzas, Skeleton, Pagination } from '../components';

import { filterSelector } from '../redux/slices/filterSlice';
import { fetchPizzas, getPizzaSelector } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';
import { PizzasItems, Status } from '../redux/slices/types/pizzaTypes';

const Home: React.FC = () => {
   const dispatch = useAppDispatch();

   const { categoryId: activeCategory, sort: sortValue, searchValue } = useSelector(filterSelector);
   const { pizzas, status, currentPage } = useSelector(getPizzaSelector);

   async function getPizzas() {
      const sort = sortValue.type ? `sortBy=${sortValue.type}` : '';
      const category = activeCategory ? `&category=${activeCategory}` : '';
      const title = searchValue ? `&title=*${searchValue}*` : '';

      dispatch(
         fetchPizzas({
            sort,
            category,
            title,
            currentPage,
         }),
      );
   }

   React.useEffect(() => {
      getPizzas();
   }, [sortValue.type, activeCategory, searchValue, currentPage]);

   const pizzaItems = pizzas.map((pizza: PizzasItems) => (
      <li key={pizza.id}>
         <Pizzas {...pizza} />
      </li>
   ));
   const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

   return (
      <>
         <div className='main-actions flex al-c gap-20 f-wrap'>
            <Categories />
            <Sort />
         </div>
         <div className='items'>
            <h2 className='items__title title'>Все пиццы</h2>
            {status === Status.ERROR ? (
               <section className='not-found t-al-center'>
                  <div className='not-found__icon'>&#128533;</div>
                  <h1 className='not-found__title'>Произошло ошибка</h1>
                  <p className='not-found__text'>
                     К сожелению, не удалось получить пиццы. Попробуйте повтарить попытку позже
                  </p>
               </section>
            ) : (
               <ul className='items__list'>{status === Status.LOADING ? skeletons : pizzaItems}</ul>
            )}
         </div>
         <Pagination />
      </>
   );
};

export default Home;
