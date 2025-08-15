import MovieCard from "../components/MovieCard";
import { useState, useEffect, useLayoutEffect } from "react";
import "../css/Home.css";
import {
  searchMovies,
  getPopularMovies,
  GenreMapping,
  fetchMoviesByPage,
} from "../services/api.js";
import { Link } from "react-router-dom";
import { useRef } from "react";
//import { useNavigate } from "react-router-dom";
//import { handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";

export default function Home({ isAuthenticated, setIsAuthenticated }) {
  const scrollYRef = useRef(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [genreMap, setGenreMap] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [LoggedInUser, setLoggedInUser] = useState("");
  //const navigate = useNavigate();

  useEffect(() => {
    const loadInitialMovies = async () => {
      setLoading(true);
      const initialMovies = await fetchMoviesByPage(1);
      setMovies(initialMovies);
      setLoading(false);
    };

    loadInitialMovies();
  }, []);

  const loadMoreMovies = async () => {
    scrollYRef.current = window.scrollY; // changed here to restore position after component re-rendering
    console.log("scrollY", scrollYRef);

    const nextPage = page + 1;
    setLoading(true);
    const newMovies = await fetchMoviesByPage(nextPage);

    const uniqueMovies = newMovies.filter(
      (newMovie) =>
        !movies.some((existingMovie) => existingMovie.id === newMovie.id)
    );

    if (uniqueMovies.length === 0) {
      setHasMore(false);
    } else {
      setMovies((prev) => [...prev, ...uniqueMovies]);
      setPage(nextPage);
      //window.scrollTo({ top: scrollYRef, behavior: "auto" });
      // setTimeout(() => {
      //   window.scrollTo({ top: scrollYBefore, behavior: "auto" });
      // }, 0);
    }

    setLoading(false);
  };

  useLayoutEffect(() => {
    if (scrollYRef.current) {
      window.scrollTo({ top: scrollYRef.current, behavior: "auto" });
      scrollYRef.current = 0;
    }
  }, [movies]);

  // useEffect(() => {
  //   const getGenreByMovies = async () => {
  //     try {
  //       const getGenre = await GenreMapping();
  //       //console.log("Fetched genreMap:", getGenre);
  //       setGenreMap(getGenre);
  //     } catch (err) {
  //       console.log(err);
  //       setError("Failed to load movies...");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getGenreByMovies();
  // }, []);

useEffect(() => {
  const fetchGenres = async () => {
    try {
      const list = await GenreMapping(); // [{id: 28, name: "Action"}, ...]
      
      // Convert array into object map
      const map = {};
      list.forEach(g => {
        map[g.id] = g.name;
      });
      
      setGenreMap(map);
    } catch (err) {
      console.error(err);
      setError("Failed to load genres");
    } finally {
      setLoading(false);
    }
  };
  
  fetchGenres();
}, []);


  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) return;

    const delayDebounce = setTimeout(() => {
      fetchSearchResults(searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const fetchSearchResults = async (query) => {
    setLoading(true);

    try {
      const searchResults = await searchMovies(query);
      setMovies(searchResults);
      setError(false);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("LoggedInUser"));
  }, []);

  // const handleLogout = async () => {
  //   localStorage.removeItem("Token");
  //   localStorage.removeItem("LoggedInUser");
  //   handleSuccess("User Logged out");
  //   setTimeout(() => {
  //     navigate('/login');
  //   }, 1000);
  // };

  return (
    <div className="home">
      <form onSubmit={(e) => e.preventDefault()} className="search-form">
        <input
          type="text"
          placeholder="Search for movies"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-btn" type="submit">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map(
            (movie) =>
              movie.title.toLowerCase().startsWith(searchQuery) && (
                <div className="movie-card" key={movie.id}>
                  <Link
                    to={"/Home/" + movie.id}
                    state={{ movie, genreMap }} // Pass additional data
                    className="movie-card-link"
                  >
                    <MovieCard
                      movie={movie}
                      key={movie.id}
                      genreMap={genreMap}
                      isAuthenticated={isAuthenticated}
                      setIsAuthenticated={setIsAuthenticated}
                    />
                  </Link>
                </div>
              )
          )}
        </div>
      )}

      {!loading && hasMore && (
        <button
          type="button"
          className="load-more-btn"
          onClick={loadMoreMovies}
        >
          Load More
        </button>
      )}
      {!hasMore && <p>No more movies to load!</p>}
      <ToastContainer />
    </div>
  );
}
  