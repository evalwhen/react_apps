import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {

  return (
    <div className='h-screen'>
      <Header />
      <Main />
    </div>
  )
}

function Header() {
  return (
    <div className="flex justify-between items-center  px-8 py-3 bg-purple-600 mx-6 my-5 rounded-lg">
      <div className="flex text-2xl">
        <span role="img" className="mr-3">
          🍿
        </span>
        <p className="text-white">usePopcorn</p>
      </div>
      <input
        type="text"
        className="text-lg px-3 py-2 rounded-lg bg-purple-500 text-white w-[25rem] border-none"
        placeholder="Search movies..."
      />
      <p className="text-white text-xl">Found 10 results</p>
    </div>
  );
}

function Main() {
  return (
    <div className='w-2/3 flex justify-between mx-auto h-screen'>
      <MovieList />
      {/* <WatchedList /> */}
      <MovieDetail />
    </div>
  )
}

function MovieList() {
  return (
    <div className='w-1/2 bg-gray-800 rounded-lg mr-6'>
      <Movie />
      <Movie />
    </div>
  )
}

function Movie() {
  return (
    <div className='flex border-b px-8 py-4 border-gray-600 cursor-pointer hover:bg-gray-600'>
      <img
        src="https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
        alt=""
        className='h-16 mr-4'
      />
      <div className='flex flex-col justify-center'>
        <p className='text-white text-lg font-semibold'>Back to the Future </p>
        <div className='flex'>
          <span className='mr-2'>🗓</span>
          <span className='text-white'>1980</span>
        </div>
      </div>
    </div>
  );
}

function MovieDetail() {
  return (
    // <div className='w-1/2 bg-gray-800 rounded-lg'>
    //   {/* <Movie /> */}
    // </div>

    <div className="w-1/2 bg-gray-800 rounded-lg">
      <div className="flex items-center">
        <img
          src="https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
          alt=""
          className="w-1/3"
        />
        <div className="text-white flex flex-col gap-6 px-6 py-6 bg-gray-700 w-full">
          <h1 className="text-2xl font-semibold">Back to the Future Part II</h1>
          <p className="text-sm">22 Nov 1989 • 108 min</p>
          <p className="text-sm">Adventure, Comedy, Sci-Fi</p>
          <p className="text-sm">⭐️ 7.8 IMDb rating</p>
        </div>
      </div>
      <Stars />
      <div className="flex flex-col px-10 gap-4 text-gray-300" >
        <p className='text-sm'>
          After visiting 2015, Marty McFly must repeat his visit to 1955 to
          prevent disastrous changes to 1985...without interfering with his
          first trip.
        </p>
        <p className='text-base'>Starring Michael J. Fox, Christopher Lloyd, Lea Thompson</p>
        <p className='text-base'>Directed by Robert Zemeckis</p>
      </div>
    </div>
  );
}

function Stars() {
  const stars = [...Array(10)].map((_, i) => <Star />);
  return (
    <div className='flex justify-center my-6'>
      <div className="flex bg-gray-700 px-6 py-4 rounded-lg">{stars}</div>
    </div>
  );
}

function Star() {
  return (
    <>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#fcc419"
          // className="w-6 cursor-pointer hover:fill-yellow-400"
          className="w-6 cursor-pointer"
        >
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
        </svg>
      </span>
    </>
  );
}

function WatchedList() {
  // return <MovieDetail />;
}

export default App
