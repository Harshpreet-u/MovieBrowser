import { useParams, useLocation, Link } from "react-router-dom";
import "../css/MovieDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
// import { faPlay as farPlay } from "@fortawesome/free-regular-svg-icons";
import { faList, faPlay, faClock } from "@fortawesome/free-solid-svg-icons";

export default function MovieDetails() {
  const { id } = useParams();
  console.log("Navigated to MovieDetails with ID:", id);
  const { state } = useLocation(); // access the passed movie object

  const movie = state?.movie;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked button");
  };

  return (
    <div>
      <h1>The details of the movie will be displayed here</h1>
      <p>Movie ID: {id}</p>
      <div className="movie-field">
        <div className="movie-img">
          <img
            className="movie-image-sizing"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="movie-details">
          <h2 className="movie-title-centre">{movie.title}</h2>
          <form onSubmit={handleSubmit}>
            <div className="movie-icons">
              <button className="movie-add-to-wl icons">
                <FontAwesomeIcon icon={faList} />
              </button>
              <button className="movie-favs icons">
                <FontAwesomeIcon icon={farHeart} />
              </button>
              <button className="movie-watch icons">
                <FontAwesomeIcon icon={faClock} />
              </button>
              <button className="movie-trailer">
                <FontAwesomeIcon icon={faPlay} />
                Play Trailer
              </button>
            </div>
          </form>
          <br />
          <p>
            <i>Random Quote</i>
          </p>
          <br />
          <p className="movie-des">Movie Description : {movie.overview}</p>
          <div className="movie-score">
            <p className="movie-popularity">{movie.popularity?.toString().split(".")[0]}K users liked this movie</p>
            <p className="movie-score">Score : {movie.vote_average}</p>
            <p className="movie-votes">Votes : {movie.vote_count}</p>
            <div className="movie-safe">
              {movie.adult === true ? <p>18+(R)</p> : <p>13+(G)</p>}
            </div>
          </div>
          {/* Add reviews 
          Add genres and recommendations from similar genre */}
        </div>
      </div>
    </div>
  );
}
