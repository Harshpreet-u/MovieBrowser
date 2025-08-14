import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieCContext";
import { useWatchLaterContext } from "../contexts/WatchLaterContext";
import { useWatchListContext } from "../contexts/WatchListContext";
//import { addToList, removeFromList } from "../services/api";

import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie, isAuthenticated }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const navigate = useNavigate();

  function onFavClick() {
    // e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  const { addWatchLater, removeWatchLater, isWatchLater } =
    useWatchLaterContext();
  const watchLater = isWatchLater(movie.id);

  function onWLaterClick() {
    // e.preventDefault();
    if (watchLater) removeWatchLater(movie.id);
    else {
      addWatchLater(movie);
      //console.log("Adding movie to watchList:", movie);
    }
  }

  const { addToWatchList, removeFromWatchList, isWatchList } =
    useWatchListContext();
  const watchList = isWatchList(movie.id);

  function onWListClick() {
    // e.preventDefault();
    if (watchList) removeFromWatchList(movie.id);
    else {
      addToWatchList(movie);
      //console.log("Adding movie to watchList:", movie);
    }
  }

  // const checkLogin = () => {
  //   if (localStorage.getItem("Token")) {
  //     setIsAuthrnticated(true);
  //     return true;
  //   } else {
  //     localStorage.removeItem("Token");
  //     localStorage.removeItem("LoggedInUser");
  //     navigate("/login");
  //   }
  // };

  // const handleAddFavorite = () => {
  //   addToList("favorites", movie.id, token);
  // };

  // const handleRemoveFavorite = () => {
  //   removeFromList("favorites", movie.id, token);
  // };

  const checkLoginForFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthenticated) {
      onFavClick();
      console.log("Entered if after passing the isAuth");
    } else {
      localStorage.removeItem("Token");
      localStorage.removeItem("LoggedInUser");
      //console.log("Entered else after failing to pass the isAuth");
      navigate("/login");
      //console.log("after navigate for Favs");
    }
  };

  const checkLoginForWLater = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthenticated) {
      onWLaterClick();
      console.log("Entered if after passing the isAuth");
    } else {
      localStorage.removeItem("Token");
      localStorage.removeItem("LoggedInUser");
      //console.log("Entered else after failing to pass the isAuth");
      navigate("/login");
      //console.log("after navigate for Watch Later");
    }
  };

  const checkLoginForWList = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthenticated) {
      onWListClick();
      console.log("Entered if after passing the isAuth");
    } else {
      localStorage.removeItem("Token");
      localStorage.removeItem("LoggedInUser");
      //console.log("Entered else after failing to pass the isAuth");
      navigate("/login");
      //console.log("after navigate for Watch List");
    }
  };

  return (
    <div className="movie-card">
      {/* <div>
        <h3>{movie.title}</h3>
        <button onClick={handleAddFavorite}>❤️ Add Favorite</button>
        <button onClick={handleRemoveFavorite}>❌ Remove Favorite</button>
      </div> */}
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`watchList-btn ${watchList ? "active" : ""}`}
            onClick={checkLoginForWList}
          >
            List
          </button>
          <button
            className={`favourite-btn ${favorite ? "active" : ""}`}
            onClick={checkLoginForFav}
          >
            ♡
          </button>
          <button
            className={`watchLater-btn ${watchLater ? "active" : ""}`}
            onClick={checkLoginForWLater}
          >
            Later
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
        <p>{movie.id}</p>
      </div>
    </div>
  );
}

// import "../css/MovieCard.css";
// import { useMovieContext } from "../contexts/MovieCContext";
// import { useWatchLaterContext } from "../contexts/WatchLaterContext";
// import { useWatchListContext } from "../contexts/WatchListContext";
// import api from "../services/api"; // <-- your API service
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// export default function MovieCard({ movie, isAuthenticated }) {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("Token");

//   // Local states for backend-sync status
//   const [favorite, setFavorite] = useState(false);
//   const [watchLater, setWatchLater] = useState(false);
//   const [watchList, setWatchList] = useState(false);

//   const { addToFavorites, removeFromFavorites } = useMovieContext();
//   const { addWatchLater, removeWatchLater } = useWatchLaterContext();
//   const { addToWatchList, removeFromWatchList } = useWatchListContext();

//   // Fetch current lists from backend on mount
//   // useEffect(() => {
//   //   const fetchLists = async () => {
//   //     if (!isAuthenticated || !token) return;
//   //     try {
//   //       const lists = await api.getUserLists();
//   //       setFavorite(lists.favorites.includes(movie.id.toString()));
//   //       setWatchLater(lists.watchLater.includes(movie.id.toString()));
//   //       setWatchList(lists.watchList.includes(movie.id.toString()));
//   //     } catch (err) {
//   //       console.error("Error fetching lists:", err);
//   //     }
//   //   };
//   //   fetchLists();
//   // }, [movie.id, isAuthenticated, token]);

//   // Toggle handlers — updates both backend + context
//   // const toggleFavorite = async (e) => {
//   //   e.preventDefault();
//   //   e.stopPropagation();
//   //   if (!isAuthenticated) return redirectToLogin();

//   //   try {
//   //     if (favorite) {
//   //       await api.removeFromList("favorites", movie.id);
//   //       removeFromFavorites(movie.id);
//   //       setFavorite(false);
//   //     } else {
//   //       await api.addToList("favorites", movie.id);
//   //       addToFavorites(movie);
//   //       setFavorite(true);
//   //     }
//   //   } catch (err) {
//   //     console.error("Error updating favorites:", err);
//   //   }
//   // };

//   // const toggleWatchLater = async (e) => {
//   //   e.preventDefault();
//   //   e.stopPropagation();
//   //   if (!isAuthenticated) return redirectToLogin();

//   //   try {
//   //     if (watchLater) {
//   //       await api.removeFromList("watchLater", movie.id);
//   //       removeWatchLater(movie.id);
//   //       setWatchLater(false);
//   //     } else {
//   //       await api.addToList("watchLater", movie.id);
//   //       addWatchLater(movie);
//   //       setWatchLater(true);
//   //     }
//   //   } catch (err) {
//   //     console.error("Error updating watch later:", err);
//   //   }
//   // };

//   const toggleWatchList = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (!isAuthenticated) return redirectToLogin();

//     try {
//       if (watchList) {
//         await api.removeFromList("watchList", movie.id);
//         removeFromWatchList(movie.id);
//         setWatchList(false);
//       } else {
//         await api.addToList("watchList", movie.id);
//         addToWatchList(movie);
//         setWatchList(true);
//       }
//     } catch (err) {
//       console.error("Error updating watch list:", err);
//     }
//   };

//   const redirectToLogin = () => {
//     localStorage.removeItem("Token");
//     localStorage.removeItem("LoggedInUser");
//     navigate("/login");
//   };

//   return (
//     <div className="movie-card">
//       <div className="movie-poster">
//         <img
//           src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//           alt={movie.title}
//         />
//         <div className="movie-overlay">
//           <button
//             className={`watchList-btn ${watchList ? "active" : ""}`}
//             onClick={toggleWatchList}
//           >
//             List
//           </button>
//           <button
//             className={`favourite-btn ${favorite ? "active" : ""}`}
//             onClick={toggleFavorite}
//           >
//             ♡
//           </button>
//           <button
//             className={`watchLater-btn ${watchLater ? "active" : ""}`}
//             onClick={toggleWatchLater}
//           >
//             Later
//           </button>
//         </div>
//       </div>
//       <div className="movie-info">
//         <h3>{movie.title}</h3>
//         <p>{movie.release_date?.split("-")[0]}</p>
//         <p>{movie.id}</p>
//       </div>
//     </div>
//   );
// }
