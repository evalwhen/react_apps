import { useState } from 'react'
import { useEffect } from 'react';
import { useMovies } from './useMovie';
// import './App.css'

const KEY = "f84fc31d";
// const KEY = "189f5a14";


function App() {
  const [query, setQuery] = useState("");
  const [isLoading, error, movies] = useMovies(query)

  return (
    <div className='h-screen'>
      <Header query={query} setQuery={setQuery} />
      <Main movies={movies}/>
    </div>
  )
}

function Header({query, setQuery}) {
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
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <p className="text-white text-xl">Found 10 results</p>
    </div>
  );
}

function Main({movies}) {
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState([]);

  function handleSelectMovie(id) {
    // setSelectedId(id == selectedId ? null : id)
    setSelectedId(id)
  }

  function handleCloseDetail() {
    setSelectedId(null);
  }

  function handleAdd(newWatched) {
    setWatched((watched) => [...watched, newWatched])
  }

  return (
    <div className="w-2/3 flex justify-between mx-auto min-h-svh">
      <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
      {selectedId ? (
        <MovieDetail
          selectedId={selectedId}
          onClose={handleCloseDetail}
          onAddMovie={handleAdd}
        />
      ) : (
        <WatchedList watched={watched} />
      )}
    </div>
  );
}

function MovieList({movies, onSelectMovie}) {
  return (
    <div className='w-1/2 bg-gray-800 rounded-lg mr-6'>
      {/* <Movie movie={movies}/> */}
      {/* <Movie /> */}
      {
        movies?.map(m => <Movie key={m.imdbID} movie={m} onSelectMovie={onSelectMovie}/>)
      }
    </div>
  )
}

function Movie({movie, onSelectMovie}) {
  return (
    <div className='flex border-b px-8 py-4 border-gray-600 cursor-pointer hover:bg-gray-600'
         onClick={() => onSelectMovie(movie.imdbID)}
    >
      <img
        src={movie.Poster}
        alt=""
        className='h-16 mr-4'
      />
      <div className='flex flex-col justify-center'>
        {/* <p className='text-white text-lg font-semibold'>"Title"</p> */}
        <p className='text-white text-lg font-semibold'>{movie.Title}</p>
        <div className='flex'>
          <span className='mr-2'>🗓</span>
          <span className='text-white'>{movie.Year}</span>
        </div>
      </div>
    </div>
  );
}

function MovieDetail({selectedId, onClose, onAddMovie}) {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(0);

  useEffect(
    function () {
      async function getMovieDetail() {
        setIsLoading(true);

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        console.log(selectedId);
        const data = await res.json();
        console.log(data);

        setMovie(data);
        setIsLoading(false);
      }

      getMovieDetail();
    },
    [selectedId]
  );

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAddWatched() {
    const newWatched = {
      imdbID: selectedId,
      title,
      year,
      poster,
      runtime,
      imdbRating,
      plot,
      released,
      actors,
      director,
      genre,
      userRating
    };

    onAddMovie(newWatched);
    onClose();
  }

  return (
    <div className="w-1/2 bg-gray-800 rounded-lg">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center relative h-1/4">
            <button
              className="absolute bg-white rounded-full px-2 py-1 left-2 top-2 text-2xl text-black"
              onClick={() => onClose()}
            >
              ←
            </button>
            <button className="absolute bg-gray-800 rounded-full  right-2 top-2 px-2 text-base text-white aspect-square">
              -
            </button>
            <img
              src={movie.Poster}
              alt=""
              className="w-1/3 rounded-tl-lg h-full"
            />
            <div className="text-white flex flex-col justify-center gap-6 px-6 py-6 bg-gray-700 w-full rounded-tr-lg h-full">
              <h1 className="text-2xl font-semibold">{movie.Title}</h1>
              <p className="text-sm">{movie.Released}</p>
              <p className="text-sm">{movie.Genre}</p>
              <p className="text-sm">⭐️ {movie.imdbRating} IMDb rating</p>
            </div>
          </div>
          <div className="flex flex-col px-10 gap-4 text-gray-300">
            <div className="flex flex-col my-6 bg-gray-700 px-10 py-4 rounded-lg gap-6">
              <Stars
                userRating={userRating}
                setUserRating={setUserRating}
              />
              {userRating > 0 && (
                <button className="bg-purple-700 py-1 rounded-full font-bold"
                onClick={() => handleAddWatched()}>
                  + Add to list
                </button>
              )}
            </div>
            <p className="text-sm">
              After visiting 2015, Marty McFly must repeat his visit to 1955 to
              prevent disastrous changes to 1985...without interfering with his
              first trip.
            </p>
            <p className="text-base">
              Starring Michael J. Fox, Christopher Lloyd, Lea Thompson
            </p>
            <p className="text-base">Directed by Robert Zemeckis</p>
          </div>
        </>
      )}
    </div>
  );
}

function Loader() {
  return <p className="text-white text-center text-3xl fond-bold mt-12">Loading...</p>;
}

function Stars({userRating, setUserRating}) {
  const [tempRating, setTempRating] = useState(0);

  function handleSetRating(i) {
    setTempRating(i);
    setUserRating(i);
  }

  const stars = [...Array(10)].map(
    function (_, i) {
      return (
        <Star
          key={i}
          full={tempRating > i ? true : false}
          onHoverIn={() => setTempRating(i + 1)}
          onHoverOut={() =>
            userRating > 0 ? setTempRating(userRating) : setTempRating(0)
          }
          onRating={() => handleSetRating(i + 1)}
        />
      );
    }
    );
  return (
      <div className="flex items-center gap-6 ">
        <div className="flex">{stars}</div>
        <p className="text-yellow-500 text-center">
          {tempRating > 0 ? tempRating : " "}
        </p>
      </div>
  );
}

function Star({full, onHoverIn, onHoverOut, onRating}) {
  return (
    <>
      <span onMouseEnter={onHoverIn} 
      onMouseLeave={onHoverOut}
      onClick={onRating}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#fcc419"
          // className="w-6 cursor-pointer hover:fill-yellow-400"
          // className="w-6 cursor-pointer {}"
          className={
            full
              ? "w-6 cursor-pointer fill-yellow-400"
              : "w-6 cursor-pointer"
          }
        >
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
        </svg>
      </span>
    </>
  );
}

function WatchedList({watched}) {
  return (
    <div className="w-1/2 bg-gray-800 rounded-lg relative">
      <button className="absolute bg-gray-900 rounded-full  right-2 top-2 px-2 text-base text-white aspect-square">
        -
      </button>
      <div className="text-white font-semibold bg-gray-700 px-8 py-3 rounded-lg">
        <h1>MOVIES YOU WATCHED</h1>
        <div className='flex gap-6 items-center justify-start'>
          <div className='flex gap-2 items-center'>
            <span>#️⃣</span>
            {/* <span>1 movies</span> */}
            <div className='flex flex-col'>
              <span>1</span>
              <span>movies</span>
            </div>
          </div>
          <div className='flex gap-2'>
            <span>⭐️</span>
            <span>8.50</span>
          </div>
          <div className='flex gap-2'>
            <span>🌟</span>
            <span>5.00</span>
          </div>
          <div className='flex gap-2 items-center'>
            <span>⏳</span>
            {/* <span>116 min</span> */}
            <div className='flex flex-col'>
              <span>1</span>
              <span>movies</span>
            </div>

          </div>
        </div>
      </div>
      <div>
        {watched.map((m) => <WatchedMovie movie={m} key={m.imdbID}/>)}
        {/* <WatchedMovie /> */}
      </div>
    </div>
  );
}

function WatchedMovie({movie}) {
  return (
    <div className="flex mt-6 items-center border-b py-4 px-10 border-gray-500 relative">
      <button className="absolute right-6 bg-red-600 aspect-square rounded-full px-1 text-xs">X</button>
      <img
        // src="https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
        src={movie.poster}

        alt=""
        className="h-16 mr-4"
      />
      <div>
        <p className="text-white text-lg font-semibold">{movie.title}</p>
        <div className="flex gap-6 items-center justify-start text-white">
          <div className="flex gap-2">
            <span>⭐️</span>
            {/* <span>8.50</span> */}
            <span>{movie.imdbRating}</span>
          </div>
          <div className="flex gap-2">
            <span>🌟</span>
            {/* <span>5.00</span> */}
            <span>{movie.userRating}</span>
          </div>
          <div className="flex gap-2 items-center">
            <span>⏳</span>
            {/* <span>116 min</span> */}
            <div className="flex">
              <span>1 min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
