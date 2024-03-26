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
      <WatchedList />
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

function MovieWatched() {

}

function WatchedList() {
  return (
    <div className='w-1/2 bg-gray-800 rounded-lg'>
      <Movie />
    </div>
  )
}

export default App
