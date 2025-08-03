import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieCContext";
import { useWatchLaterContext } from "../contexts/WatchLaterContext";
import { useWatchListContext } from "../contexts/WatchListContext";

export default function MovieCard({ movie }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  const { addWatchLater, removeWatchLater, isWatchLater } =
    useWatchLaterContext();
  const watchLater = isWatchLater(movie.id);

  function onWLaterClick(e) {
    e.preventDefault();
    if (watchLater) removeWatchLater(movie.id);
    else {
      addWatchLater(movie);
      //console.log("Adding movie to watchList:", movie);
    }
  }

  const { addToWatchList, removeFromWatchList, isWatchList } =
    useWatchListContext();
  const watchList = isWatchList(movie.id);

  function onWListClick(e) {
    e.preventDefault();
    if (watchList) removeFromWatchList(movie.id);
    else {
      addToWatchList(movie);
      //console.log("Adding movie to watchList:", movie);
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`watchList-btn ${watchList ? "active" : ""}`}
            onClick={onWListClick}
          >
            List
          </button>
          <button
            className={`favourite-btn ${favorite ? "active" : ""}`}
            onClick={onFavClick}
          >
            ♡
          </button>
          <button
            className={`watchLater-btn ${watchLater ? "active" : ""}`}
            onClick={onWLaterClick}
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
