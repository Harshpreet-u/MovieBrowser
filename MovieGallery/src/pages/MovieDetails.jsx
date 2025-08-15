import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

import "../css/MovieDetails.css";

import { useMovieContext } from "../contexts/MovieCContext";
import { useWatchLaterContext } from "../contexts/WatchLaterContext";
import { useWatchListContext } from "../contexts/WatchListContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faList, faPlay, faClock } from "@fortawesome/free-solid-svg-icons";

import { getGenreNames, GenreMapping } from "../services/api";

// public/assets/JustWatch.png;

export default function MovieDetails() {
  const { state } = useLocation();
  const movie = state?.movie;
  const initialGenreMap = state?.genreMap; // 🛠 CHANGE - use passed genreMap

  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const favorite = isFavorite(movie?.id);

  const { addWatchLater, removeWatchLater, isWatchLater } = useWatchLaterContext();
  const WLater = isWatchLater(movie?.id);

  const { addToWatchList, removeFromWatchList, isWatchList } = useWatchListContext();
  const WList = isWatchList(movie?.id);

  const [genreMap, setGenreMap] = useState(initialGenreMap || {}); // 🛠 CHANGE - default to passed genreMap
  const [genreNames, setGenreNames] = useState([]);

  function slugify(title) {
    return title
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/--+/g, "-");
  }

  function onFavClick() {
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  function onWListClick(e) {
    e.preventDefault();
    if (WList) removeFromWatchList(movie.id);
    else addToWatchList(movie);
  }

  function onWLaterClick(e) {
    e.preventDefault();
    if (WLater) removeWatchLater(movie.id);
    else addWatchLater(movie);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // 🛠 CHANGE - Only fetch genres if not passed from Home
  useEffect(() => {
    const fetchGenres = async () => {
      if (Object.keys(genreMap).length === 0) { // 🛠 CHANGE
        const genres = await GenreMapping();
        const genreObj = {};
        genres.forEach((g) => {
          genreObj[g.id] = g.name;
        });
        setGenreMap(genreObj);
      }
    };
    fetchGenres();
  }, [genreMap]);

  // 🛠 CHANGE - Use Object.keys check instead of .length for objects
  useEffect(() => {
    if (movie && Object.keys(genreMap).length > 0) {
      const names = getGenreNames(movie.genre_ids, genreMap); // 🛠 CHANGE - genreMap as object
      setGenreNames(names);
    }
  }, [genreMap, movie]);

  if (!movie) {
    return <h2>Movie not found</h2>;
  }

  return (
    <div>
      <div className="movie-field">
        <div className="movie-img">
          <img
            className="movie-image-sizing"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="movie-details">
          <h3 className="movie-title-centre">
            {movie.title}{" "}
            <span className="movie-header-date">
              ({movie.release_date?.split("-")[0]})
            </span>
          </h3>
          <div style={{ display: "inline" }}>
            <span className="movie-safe">
              {movie.adult === true ? <p>18+(R)</p> : <p>13+(G)</p>}&nbsp;
            </span>
            <span>({movie.release_date}) &nbsp;</span>
            <span className="movie-genres">
              {genreNames.map((name, idx) => (
                <span key={idx}>
                  <Link
                    to={`/Genre/${name}`}
                    state={{ movie, genreNames }}
                    className="genre-tag"
                  >
                    {name}
                  </Link>
                  {idx < genreNames.length - 1 && ", "}
                </span>
              ))}
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="movie-icons">
              <button
                onClick={onWListClick}
                className={`movie-favs icons watchList-btn ${WList ? "active" : ""}`}
              >
                <FontAwesomeIcon icon={faList} />
              </button>
              <button
                onClick={onFavClick}
                className={`movie-favs icons favourite-btn ${favorite ? "active" : ""}`}
              >
                <FontAwesomeIcon icon={farHeart} />
              </button>
              <button
                onClick={onWLaterClick}
                className={`movie-favs icons watchLater-btn ${WLater ? "active" : ""}`}
              >
                <FontAwesomeIcon icon={faClock} />
              </button>
              <button className="movie-trailer">
                <FontAwesomeIcon icon={faPlay} />
                <Link
                  style={{ color: "white" }}
                  to={`https://www.youtube.com/results?search_query=${slugify(movie.title)}`}
                >
                  Play Trailer
                </Link>
              </button>
              <button className="movie-favs icons">
                <Link
                  style={{ color: "white" }}
                  to={`https://www.justwatch.com/in/movie/${slugify(movie.title)}`}
                >
                  <img
                    src="/assets/JustWatch.png"
                    alt="JustWatch"
                    style={{ width: "20px", height: "20px" }}
                  />
                </Link>
              </button>
            </div>
          </form>
          <p style={{ opacity: 0.8 }}>
            <i>Random Quote</i>
          </p>
          <p className="movie-overview">Overview</p>
          <p className="movie-des">{movie.overview.split(".")[0]}</p>
          <div className="movie-score">
            <p className="movie-popularity">
              {movie.popularity?.toString().split(".")[0]}K users liked this movie
            </p>
            <p className="movie-score">Score : {movie.vote_average}</p>
            <p className="movie-votes">Votes : {movie.vote_count}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
