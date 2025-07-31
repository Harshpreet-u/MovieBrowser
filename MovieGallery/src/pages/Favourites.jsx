import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieCContext";
import MovieCard from "../components/MovieCard";

export default function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites) {
    return (
      <div className="favorites">
        <h2>Your Favorite Movies</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <div>
                  <Link
                    to={"/Home/" + movie.id}
                    state={{movie}}
                    key={movie.id}
                    className="-card-link"
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
    <div className="favorites-empty">
      <h2>No favourite movies yet</h2>
      <p>Start adding movies to your favourites and they will appear here</p>
    </div>
  );
}
