import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CardSkeleton = ({cards}) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
        <div className='card-skeleton items-center grid gap-5 my-2 md:grid-cols-2 lg:grid-cols-1 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 text-black max-w-screen-xl'>
            <div className="left-column">
                <Skeleton className='rect-img'/>
            </div>
            <div className="right-column">
                <Skeleton count={4} />
            </div>
        </div>
    ));
};

export default CardSkeleton