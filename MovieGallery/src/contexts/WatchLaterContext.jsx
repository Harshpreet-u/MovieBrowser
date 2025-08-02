import { createContext, useState, useEffect, useContext } from "react";

const WatchLaterContext = createContext();

export const useWatchLaterContext = () => useContext(WatchLaterContext);

export const WatchLaterProvider = ({ children }) => {
  const [watchLater, setwatchLater] = useState([]);
  useEffect(() => {
    const storedWatchLater = localStorage.getItem("watchLater");
    if (storedWatchLater) setwatchLater(JSON.parse(storedWatchLater));
  }, []);

  useEffect(() => {
    localStorage.setItem("watchLater", JSON.stringify(watchLater));
  }, [watchLater]);

  const addWatchLater = (movie) => {
    setwatchLater((prev) => [...prev, movie]);
  };

  const removeWatchLater = (movieId) => {
    setwatchLater((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isWatchLater = (movieId) => {
    return watchLater.some((movie) => movie.id === movieId);
  };

  const value = { watchLater, addWatchLater, removeWatchLater, isWatchLater };

  return (
    <WatchLaterContext.Provider value={value}>{children}
    </WatchLaterContext.Provider>
  );
};
