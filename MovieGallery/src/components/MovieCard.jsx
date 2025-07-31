import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieCContext";

export default function MovieCard({ movie }) {

  const {addToFavorites, removeFromFavorites, isFavorite} = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavClick(e) {
    e.preventDefault();
    if(favorite) removeFromFavorites(movie.id)
    else addToFavorites(movie)
  }
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className="movie-overlay">
          <button className={`favourite-btn ${favorite ? "active" : "" }`} onClick={onFavClick}>
            ♡
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
