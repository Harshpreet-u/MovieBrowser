import { createContext, useState, useEffect, useContext } from "react";

const WatchListContext = createContext();

export const useWatchListContext = () => useContext(WatchListContext);

export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);
  useEffect(() => {
    const storedWatchList = localStorage.getItem("watchList");
    if (storedWatchList) setWatchList(JSON.parse(storedWatchList));
  }, []);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  const addToWatchList = (movie) => {
    // setWatchList((prev) => [...prev, movie]);
    setWatchList((prev) => {
      const updated = [...prev, movie];
      //console.log("Updated WatchList: ", updated);
      return updated;
    });
  };

  const removeFromWatchList = (movieId) => {
    setWatchList((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isWatchList = (movieId) => {
    return watchList.some((movie) => movie.id === movieId);
  };

//   useEffect(() => {
//   //onsole.log("WatchList changed:", watchList);
//   localStorage.setItem("watchList", JSON.stringify(watchList));
// }, [watchList]);

  const value = { watchList, addToWatchList, removeFromWatchList, isWatchList };

  return (
    <WatchListContext.Provider value={value}>
      {children}
    </WatchListContext.Provider>
  );
};
