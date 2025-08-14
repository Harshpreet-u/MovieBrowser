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
import GenrePage from "./GenrePage";

// public/assets/JustWatch.png;

export default function MovieDetails() {
  //const { id } = useParams();
  //console.log("Navigated to MovieDetails with ID:", id);

  const { state } = useLocation();

  const movie = state?.movie;
  const initialGenreMap = state?.genreMap;

  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const favorite = isFavorite(movie.id);
  //const { favorites } = useMovieContext();
  //console.log("favs = ", favorites);

  const { addWatchLater, removeWatchLater, isWatchLater } =
    useWatchLaterContext();
  const WLater = isWatchLater(movie.id);
  //const { watchLater } = useWatchLaterContext();
  //console.log("Wlaters = ", watchLater);

  const { addToWatchList, removeFromWatchList, isWatchList } =
    useWatchListContext();
  const WList = isWatchList(movie.id);
  //const { watchList } = useWatchListContext();
  //console.log("Wlists = ", watchList);

  const [genreMap, setGenreMap] = useState(initialGenreMap || []);
  const [genreNames, setGenreNames] = useState([]);

  // const genreNames = getGenreNames(movie.genre_ids, genreMap);
  //console.log("MovieDetails props:", movie, genreMap);

  function slugify(title) {
    return title
      .toLowerCase()
      .replace(/&/g, "and") // Replace & with "and"
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumerics (including .) with hyphen
      .replace(/^-+|-+$/g, "") // Trim leading/trailing hyphens
      .replace(/--+/g, "-"); // Replace multiple hyphens with a single one
  }

  function onFavClick() {
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  function onWListClick(e) {
    e.preventDefault();
    if (WList) removeFromWatchList(movie.id);
    else {
      addToWatchList(movie);
      //console.log("Adding movie to watchList:", movie);
    }
  }

  function onWLaterClick(e) {
    e.preventDefault();
    if (WLater) removeWatchLater(movie.id);
    else {
      addWatchLater(movie);
      //console.log("Adding movie to watchList:", movie);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("clicked button");
  };

  useEffect(() => {
    const fetchGenres = async () => {
      if (!initialGenreMap) {
        const fetchedGenres = await GenreMapping();
        setGenreMap(fetchedGenres);
      }
    };
    fetchGenres();
  }); // removed [] from here

  useEffect(() => {
    if (movie && genreMap.length > 0) {
      const names = getGenreNames(movie.genre_ids, genreMap);
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
                    key={idx}
                    className="genre-tag"
                  >
                    {name} ,
                    {/* <GenrePage
                      movie={movie}
                      key={movie.id}
                      genreMap={genreMap}
                    /> */}
                  </Link>
                  {/* <a href="#">
                    
                  </a>{" "}
                  , */}
                </span>
              ))}
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="movie-icons">
              <button
                onClick={onWListClick}
                className={`movie-favs icons watchList-btn ${
                  WList ? "active" : ""
                }`}
              >
                <FontAwesomeIcon icon={faList} />
              </button>
              <button
                onClick={onFavClick}
                className={`movie-favs icons favourite-btn ${
                  favorite ? "active" : ""
                }`}
              >
                <FontAwesomeIcon icon={farHeart} />
              </button>
              <button
                onClick={onWLaterClick}
                className={`movie-favs icons watchLater-btn ${
                  WLater ? "active" : ""
                }`}
              >
                <FontAwesomeIcon icon={faClock} />
              </button>
              <button className="movie-trailer">
                <FontAwesomeIcon icon={faPlay} />
                <Link
                  style={{ color: "white" }}
                  to={`https://www.youtube.com/results?search_query=${slugify(
                    movie.title
                  )}`}
                >
                  Play Trailer
                </Link>
              </button>
              <button className="movie-favs icons">
                <Link
                  style={{ color: "white" }}
                  to={`https://www.justwatch.com/in/movie/${slugify(
                    movie.title
                  )}`}
                >
                  <img
                    src="/assets/JustWatch.png"
                    alt="JustWatch"
                    style={{ width: "20pxpx", height: "20px" }}
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
              {movie.popularity?.toString().split(".")[0]}K users liked this
              movie
            </p>
            <p className="movie-score">Score : {movie.vote_average}</p>
            <p className="movie-votes">Votes : {movie.vote_count}</p>
          </div>
          {/* Add reviews 
          Add genres and recommendations from similar genre */}
        </div>
      </div>
    </div>
  );
}

// more features to add :
// create user  along with user DB
// link watch list, watch later and favourties to each account 

// Advanced features :
// segregate movies and tv-shows seperatelt
// make a trending and whats popular section for both which is scrollable-x and on the end of the scroll we are redirected to the page to see more of the treding
// create comments and staring system 
// create the cast list for each movie