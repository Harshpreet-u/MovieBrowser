import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { fetchMoviesByGenreName, fetchGenreByPage } from "../services/api";

export default function GenrePage() {
  const { genreName } = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMoviesByGenre = async () => {
      setLoading(true);
      const initialGenreMovies = await fetchGenreByPage(1, genreName);
      setMovies(initialGenreMovies);
      setLoading(false);
    };
    loadMoviesByGenre();
  }, [genreName]);

  const loadMoreMoviesByGenre = async () => {
    const nextPage = page + 1;
    setLoading(true);
    const initialGenreMovies = await fetchGenreByPage(nextPage, genreName);

    const uniqueMovies = initialGenreMovies.filter(
      (initalGenreMovie) =>
        !movies.some(
          (existingMovie) => existingMovie.id === initalGenreMovie.id
        )
    );
    if (uniqueMovies.length == 0) {
      setHasMore(false);
    } else {
      setMovies((prev) => [...prev, ...uniqueMovies]);
      setPage(nextPage);
    }
    setLoading(false);
    //setMovies(initialGenreMovies);
  };

  useEffect(() => {
    const loadMovies = async () => {
      const fetchedMovies = await fetchMoviesByGenreName(genreName);
      setMovies(fetchedMovies);
    };

    loadMovies();
  }, [genreName]);

  return (
    <div className="genre-page">
      <h2>
        Movies of the <strong>{genreName}</strong> genre
      </h2>
      <div className="movies-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id}>
              <Link
                to={`/Home/${movie.id}`}
                state={{ movie }}
                className="movie-card-link"
              >
                <MovieCard movie={movie} />
              </Link>
            </div>
          ))
        ) : (
          <p>Loading or no movies found...</p>
        )}
      </div>
      {!loading && hasMore && (
        <button
          type="button"
          className="load-more-btn"
          onClick={loadMoreMoviesByGenre}
        >
          Load More
        </button>
      )}
      {!hasMore && <p>No more movies to load!</p>}
    </div>
  );
}
