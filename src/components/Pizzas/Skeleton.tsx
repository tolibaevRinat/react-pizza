import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton: React.FC = () => {
   return (
      <ContentLoader
         speed={2}
         width={280}
         height={460}
         viewBox='0 0 280 460'
         backgroundColor='#f3f3f3'
         foregroundColor='#ecebeb'
      >
         <circle cx='130' cy='120' r='120' />
         <rect x='-1' y='264' rx='10' ry='10' width='280' height='26' />
         <rect x='0' y='305' rx='10' ry='10' width='280' height='82' />
         <rect x='0' y='404' rx='10' ry='10' width='87' height='30' />
         <rect x='142' y='397' rx='10' ry='10' width='137' height='42' />
      </ContentLoader>
   );
};
