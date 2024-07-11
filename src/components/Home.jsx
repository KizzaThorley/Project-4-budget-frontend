import React from 'react'
import Carousel from './Carousel'
import { Link } from 'react-router-dom';

export default function Home({ isLoggedIn }) {


  return (
    <div className='flex flex-col md:flex-row items-center justify-center max-w-7xl w-4/5 mx-auto py-10'>
      <div className='w-full md:w-1/2 min-w-[390px] mb-10 md:mb-0 md:mr-10 text-center md:text-left'>
        <h1 className='text-5xl font-bold mb-4 text-blue-700'>Money-Map</h1>
        <p className='text-lg mb-6'>
          Welcome to Money-Map, where you can find the best tips and tools to manage your finances effectively.
        </p>
        {isLoggedIn ?
          <Link
            to="/my-budget"
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Your Budget
          </Link> :
          <Link
            to="/sign-up"
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Get Started
          </Link>
        }
      </div>
      <div className='w-full md:w-1/2 min-w-[390px]'>
        <Carousel />
      </div>
    </div>
  );
}