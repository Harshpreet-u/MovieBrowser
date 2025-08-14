import { createContext, useState, useEffect, useContext } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value = { favorites, addToFavorites, removeFromFavorites, isFavorite };

  return (
    <MovieContext.Provider value={value}>{children}
    </MovieContext.Provider>
  );
};

// import { createContext, useContext, useState, useEffect } from "react";

// const MovieContext = createContext();

// export const MovieProvider = ({ children }) => {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     fetchLists();
//   }, []);

//   async function fetchLists() {
//     const token = localStorage.getItem("Token");
//     if (!token) return;
//     const res = await fetch("http://localhost:8080/api/lists", {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     const data = await res.json();
//     setFavorites(data.favorites || []);
//   }

//   async function addToFavorites(movie) {
//     const token = localStorage.getItem("Token");
//     const res = await fetch(`http://localhost:8080/api/lists/favorites/add`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({ movie })
//     });
//     const updatedList = await res.json();
//     setFavorites(updatedList);
//   }

//   async function removeFromFavorites(movieId) {
//     const token = localStorage.getItem("Token");
//     const res = await fetch(`http://localhost:8080/api/lists/favorites/remove`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({ movieId })
//     });
//     const updatedList = await res.json();
//     setFavorites(updatedList);
//   }

//   function isFavorite(id) {
//     return favorites.some(m => m.id === id);
//   }

//   return (
//     <MovieContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
//       {children}
//     </MovieContext.Provider>
//   );
// };

// export const useMovieContext = () => useContext(MovieContext);
