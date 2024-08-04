import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useEffect } from 'react';

function App() {
  const [status, setStatus] = useState("ready");
  const [questions, setQuetions] = useState([]);
  const [index, setIndex] = useState(0);

  function handleStart() {
    setStatus("active");
  }

  function handleNext() {
    setIndex((i) => i + 1)
  }

  useEffect(function() {
    fetch("http://localhost:9000/questions")
    .then((res) => res.json())
    .then((data) => setQuetions(data))
    .catch((err) => console.log(err))
  },
  []);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center w-[550px] mx-auto">
        {status === "ready" && <Welcome onStart={handleStart}/>}

        {status === "active" && (
          <>
          <Process index={index} />
          <Question questions={questions} index={index} />
          <Footer onNext={handleNext}/>
          </>
        )}
      </div>
    </>
  );
}

function Header() {
  return (
    <>
      <div className="flex items-center justify-center mt-8 w-full">
        <img src={reactLogo} alt="" className="h-32 mr-8" />
        <p className="text-gray-200 text-6xl uppercase">The React Quiz</p>
      </div>
    </>
  );
}

function Welcome({onStart}) {
  return (
    <>
      <p className="text-gray-100 text-4xl font-semibold mt-10">
        Welcome to The React Quiz!
      </p>
      <p className="text-gray-200 text-2xl mt-4 font-medium">
        15 questions to test your React mastery
      </p>
      <button className="mt-8 text-gray-200 py-4 px-8 bg-gray-600 rounded-full text-xl cursor-pointer"
              onClick={() => onStart()}>
        Let's start
      </button>
    </>
  );
}

function Process({index}) {
  return (
    <div className="w-full mt-8">
      <p className=" h-4 bg-gray-100 rounded-full"></p>
      <div className='flex justify-between mt-2'>
        <p className='text-white'>Question {index} / 15</p>
        <p className='text-white'>0 / 280</p>
      </div>
    </div>
  );
}

function Question({questions, index}) {
  const question = questions[index];
  return (
    <div className="mt-8 w-full">
      <h1 className="text-2xl font-semibold text-gray-200 mt-8">
        {question.question}
      </h1>
      <div className="flex flex-col gap-4 mt-4">
        {question.options.map((o) => (
          <p className="bg-gray-600 py-4 px-8 rounded-full text-xl text-gray-200 cursor-pointer hover:translate-x-6 hover:bg-gray-700 hover:border-2 hover:border-gray-500 duration-500">
            {o}
          </p>
        ))}
        {/* <p className="bg-gray-600 py-4 px-8 rounded-full text-xl text-gray-200 cursor-pointer hover:translate-x-6 hover:bg-gray-700 hover:border-2 hover:border-gray-500 duration-500">
          Angular
        </p>
        <p className="bg-gray-600 py-4 px-8 rounded-full text-xl text-gray-200 cursor-pointer hover:translate-x-6 hover:bg-gray-700 hover:border-2 hover:border-gray-500 duration-500">
          React
        </p>
        <p className="bg-gray-600 py-4 px-8 rounded-full text-xl text-gray-200 cursor-pointer hover:translate-x-6 hover:bg-gray-700 hover:border-2 hover:border-gray-500 duration-500">
          Svelte
        </p>
        <p className="bg-gray-600 py-4 px-8 rounded-full text-xl text-gray-200 cursor-pointer hover:translate-x-6 hover:bg-gray-700 hover:border-2 hover:border-gray-500 duration-500">
          Vue
        </p> */}
      </div>
    </div>
  );
}

function Footer({onNext}) {
  return (
    <>
    <div className='flex justify-between items-center w-full text-white mt-8'>
      <p className='py-3 px-6 border border-gray-500 rounded-full text-xl'>04:25</p>
      <button className='py-3 px-6 bg-gray-600 rounded-full text-xl'
              onClick={() => onNext()}
      >Next</button>
    </div>
    </>
  )
}

export default App;
