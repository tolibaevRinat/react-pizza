import React from 'react';

import './scss/style.scss';

import { Route, Routes } from 'react-router-dom';
import Preloader from './components/Preloader';

const Header = React.lazy(() => import('./components/Header'));
const Home = React.lazy(() => import('./pages/Home'));
const Cart = React.lazy(() => import('./pages/Cart'));
const CartEmpty = React.lazy(() => import('./pages/CartEmpty'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const App: React.FC = () => {
   return (
      <>
         <React.Suspense fallback={<Preloader />}>
            <Header />
            <main className='page'>
               <div className='container'>
                  <Routes>
                     <Route path='/' element={<Home />} />
                     <Route path='/cart' element={<Cart />} />
                     <Route path='/cart-empty' element={<CartEmpty />} />
                     <Route path='*' element={<NotFound />} />
                  </Routes>
               </div>
            </main>
         </React.Suspense>
      </>
   );
};

export default App;
