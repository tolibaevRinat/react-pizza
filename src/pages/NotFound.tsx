import React from 'react';

function NotFound() {
   return (
      <section className='not-found t-al-center'>
         <div className='not-found__icon'>&#128533;</div>
         <h1 className='not-found__title f-700'>Ничего не найдено</h1>
         <p className='not-found__text'>
            К сожалению данная страница отсутствует в нашем интернет-магазине
         </p>
      </section>
   );
}

export default NotFound;
