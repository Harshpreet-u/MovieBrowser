import "../css/Favorites.css";
import { Link } from "react-router-dom";
import { useWatchLaterContext } from "../contexts/WatchLaterContext";
import MovieCard from "../components/MovieCard";

export default function Favorites() {
  const { watchLater } = useWatchLaterContext();
  //console.log("watchLaters = ", watchLater);

  if (watchLater) {
    return (
      <div className="favorites">
        <h2>Your Watch Later Movies</h2>
        <div className="movies-grid">
          {watchLater.map((movie) => (
            <div key={movie.id}>
              <Link
                to={`/Home/${movie.id}`}
                state={{ movie }}
                className="movie-card-link"
              >
                <MovieCard movie={movie} key={movie.id} />
              </Link>
            </div>
            // <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="watchLater-empty">
      <h2>No favourite movies yet</h2>
      <p>Start adding movies to your favourites and they will appear here</p>
    </div>
  );
}
