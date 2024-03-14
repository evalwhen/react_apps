import { useEffect, useState } from "react";

function App() {
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);
  const [elased, setElased] = useState("");

  const initialDate = new Date();

  const showTimer = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((ms / 1000 / 60) % 60)
      .toString()
      .padStart(2, "0");
    const hours = Math.floor((ms / 1000 / 60 / 60) % 60)
      .toString()
      .padStart(2, "0");

    setElased(`${hours}:${minutes}:${seconds}`);
  };

  useEffect(() => {
    if (started) {
      const id = setInterval(() => {
        var msecs = count + (new Date() - initialDate) ;
        setCount(msecs);
        showTimer(msecs);
      }, 1000);
      return () => clearInterval(id);
    } else {
      return;
    }
  }, [started]);

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

          {/* <p className="text-center text-2xl mb-1 font-bold">00:21:13</p> */}
          <p className="text-center text-2xl mb-1 font-bold">{elased}</p>
          <div className="flex justify-end pr-4 mb-2">
            <button className="mr-2">x</button>
            <button>edit</button>
          </div>
          {started ? (
            <button className="border w-full py-2 border-red-500 text-red-500 rounded-b-md"
                    onClick={() => setStarted(!started)}
            >
              stop
            </button>
          ) : (
            <button className="border w-full py-2 border-green-500 text-green-500 rounded-b-md"
                    onClick={() => setStarted(!started)}
            >
              start
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
