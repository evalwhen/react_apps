import { useEffect, useState } from "react";

const initTimers = [
  {
    id: 1,
    title: "Clear paper jam",
    description: "Office Chores",
  },
  {
    id: 2,
    title: "Ponder origins of universe",
    description: "Life Chores",
  }
]

function App() {
  const [timers, setTimers] = useState(initTimers);

  function createTimer(title, description, date) {
    const timer = {
      id: date,
      title: title,
      description: description
    } 
    
    setTimers(timers.concat(timer))
  }

  return (
    <>
      <div className="text-center mt-20 border-b">
        <h1 className="text-3xl font-semibold">Timers</h1>
      </div>

      <TimerList timers={timers} />

      <TooglableTimerForm setTimers={setTimers} createTimer={createTimer} />
    </>
  );
}

function Timer({id, title, description}) {
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);
  const [elased, setElased] = useState("00:00:00");

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
      <div className="w-1/3 mx-auto mt-6">
        <div className="w-2/3 mx-auto border rounded-md">
          <div className="pl-4 mb-4 mt-4">
            <h2 className="text-xl">{title}</h2>
            <p className="text-sm text-gray-400">{description}</p>
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

function TimerList({timers}) {

  return (
    <div>
      {timers.map((timer) => (
        <Timer
          key={timer.id}
          title={timer.title}
          description={timer.description}
        />
      ))}
    </div>
  );
}

function TooglableTimerForm({createTimer}) {
  const [toogleForm, setToogleForm] = useState(false);
  return (
    <>
    {
      toogleForm 
      ?
      <div>
        <TimerForm 
        setToogleForm={setToogleForm}
        createTimer={createTimer}
         />
      </div>
      :
      (<div className="w-1/3 mx-auto text-center mt-4 mb-4">
        <button className="border-gray-300 border px-3 py-1 text-xl"
                onClick={() => setToogleForm(true)}
        >+
        </button>
      </div>) 
    }
    </>
  );
}

function TimerForm({setToogleForm, createTimer}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleCreate() {
    createTimer(title, description, new Date());
    setToogleForm(false);
  }

  return (
    <>
      <div className="w-1/3 mx-auto my-6">
        <div className="w-2/3 mx-auto border rounded-md px-4 py-4">
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="mb-1 text-sm font-bold">
              Title
            </label>
            <input
              type="text"
              className="border text-xl py-1 px-2"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="mb-1 text-sm font-bold">
              Project
            </label>
            <input
              type="text"
              className="border text-xl py-1 px-2"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-evenly">
            <button
              className="border border-green-400 text-green-400 w-full py-1 rounded-bl-md"
              onClick={() => handleCreate()}
            >
              Create
            </button>
            <button
              className="border border-red-400 text-red-400 w-full py-1 rounded-br-md"
              onClick={() => setToogleForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
