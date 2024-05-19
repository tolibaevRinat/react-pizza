import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { getPizzaSelector, setPageNumber } from '../redux/slices/pizzaSlice';

export const Pagination: React.FC = () => {
   const { meta } = useSelector(getPizzaSelector);

   let { per_page: perPage, total_pages: totalPages } = meta;

   const dispatch = useDispatch();

   return (
      <>
         <ReactPaginate
            breakLabel='...'
            nextLabel='>'
            containerClassName='pagination flex f-center gap-20 f-wrap'
            onPageChange={(event) => {
               dispatch(setPageNumber(event.selected));
            }}
            pageRangeDisplayed={perPage ? perPage : 4}
            pageCount={totalPages ? totalPages : 3}
            previousLabel='<'
            renderOnZeroPageCount={null}
         />
      </>
   );
};
