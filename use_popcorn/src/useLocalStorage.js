import { useEffect, useState } from "react";

export function useLocalStorageState(init, key) {
  const [watched, setWatched] = useState(function() {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : init;
  });

  useEffect(
    function() {
      localStorage.setItem(key, JSON.stringify(watched));
    },
    [watched, key]
  )

  return [watched, setWatched];
}