import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {

  return (
    <>
      <div className='flex flex-col items-center'>
        <div className='flex items-center justify-center mt-8'>
          <img src={reactLogo} alt="" className='h-32 mr-8' />
          <p className='text-gray-200 text-6xl uppercase'>The React Quiz</p>
        </div>
        <p className='text-gray-100 text-4xl font-semibold mt-10'>Welcome to The React Quiz!</p>
        <p className='text-gray-200 text-2xl mt-4 font-medium'>15 questions to test your React mastery</p>
        <button className='mt-8 text-gray-200 py-4 px-8 bg-gray-600 rounded-full text-xl cursor-pointer'>Let's start</button>
      </div>
    </>
  );
}

export default App
