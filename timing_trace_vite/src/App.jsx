import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="text-center mt-20 border-b">
        <h1 className="text-3xl font-semibold">Timers</h1>
      </div>
      <div className="w-1/3 mx-auto mt-12">
        <div className="w-2/3 mx-auto border rounded-md">
          <div className="pl-4 mb-4 mt-4">
            <h2 className="text-xl">Clear paper jam</h2>
            <p className="text-sm text-gray-400">Office Chores</p>
          </div>

          <p className="text-center text-2xl mb-1 font-bold">00:21:13</p>
          <div className="flex justify-end pr-4 mb-2">
            <button className="mr-2">x</button>
            <button>edit</button>
          </div>
          <button className="border w-full py-2 border-green-500 text-green-500 rounded-md">
            start
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
