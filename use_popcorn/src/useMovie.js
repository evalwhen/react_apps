import { useState } from "react";
import { useEffect } from "react";

const KEY = "189f5a14";

export function useMovies(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(
    function() {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
        } catch (err) {
          setError(err);
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }

      fetchMovies();

      return function() {
        controller.abort();
      }
    },
    [query]
  )

  return [isLoading, error, movies]
}