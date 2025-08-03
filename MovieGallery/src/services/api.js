const API_KEY = "6660159448f862bc40e600fa9f9d874f";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};
// https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}
export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};

export const GenreMapping = async () => {
  // const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  //console.log("genre data ", data.genres);
  return data.genres;
}

export const getGenreNames = (genreIds, genreList) => {
  // console.log("genreIds:", genreIds);
  // console.log("genreMap inside getGenreNames:", genreList);
  const genreMap = {};
  genreList.forEach((g) => (genreMap[g.id] = g.name));

  return genreIds.map((id) => genreMap[id] || "no genre");
}

export async function fetchMoviesByGenreName(genreName) {
  try {
    const genres = await GenreMapping();
    const selectedGenre = genres.find(
      (g) => g.name.toLowerCase() === genreName.toLowerCase()
    );

    if (!selectedGenre) {
      console.warn("Genre not found:", genreName);
      return [];
    }

    const genreId = selectedGenre.id;

    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
    );
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error in fetchMoviesByGenreName:", error);
    return [];
  }
}

export async function getGenreIdByName(genreName) {
  const genres = await GenreMapping();
  const genre = genres.find(
    (g) => g.name.toLowerCase() === genreName.toLowerCase()
  );
  return genre ? genre.id : null;
}

export const fetchMoviesByPage = async (page=1) => {
 const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}`
  );
  const data = await res.json();
  return data.results || [];
}

export const fetchGenreByPage = async (page=1, genreName) => {
  try {
    const genres = await GenreMapping();
    const selectedGenre = genres.find(
      (g) => g.name.toLowerCase() === genreName.toLowerCase()
    );

    if (!selectedGenre) {
      console.warn("Genre not found:", genreName);
      return [];
    }

    const genreId = selectedGenre.id;

    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`)
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error in fetchMoviesByGenreName:", error);
    return [];
  }
  
}