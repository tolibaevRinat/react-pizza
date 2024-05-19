import React from 'react';

const Preloader: React.FC = () => {
   return (
      <div className='preloader abs z-50'>
         <img className='preloader__img' src='icons/logo.svg' alt=' ' />
      </div>
   );
};

export default Preloader;
