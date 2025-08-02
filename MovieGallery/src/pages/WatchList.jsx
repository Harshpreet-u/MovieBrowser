import "../css/Favorites.css";
import { Link } from "react-router-dom";
import { useWatchListContext } from "../contexts/WatchListContext";
import MovieCard from "../components/MovieCard";

export default function Favorites() {
  const { watchList } = useWatchListContext();
  //console.log("watchList = ", watchList);

  if (watchList) {
    return (
      <div className="favorites">
        <h2>Your Watch-list Movies</h2>
        <div className="movies-grid">
          {watchList.map((movie) => (
            <div key={movie.id}>
              <Link
                to={`/Home/${movie.id}`}
                state={{ movie }}
                className="movie-card-link"
              >
                <MovieCard movie={movie} key={movie.id} />
              </Link>
            </div>
          ))}
        </div>
        {/* <div className="movies-grid">
          {watchList.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div> */}
      </div>
    );
  }

  return (
    <div className="watchList-empty">
      <h2>No watchList movies yet</h2>
      <p>Start adding movies to your watchList and they will appear here</p>
    </div>
  );
}
