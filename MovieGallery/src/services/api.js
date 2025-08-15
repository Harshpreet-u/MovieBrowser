const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&language=en-US`
  );
  if (!response.ok) {
    console.log("Failed to fetch search results");
  }
  const data = await response.json();
  console.log(data.results);
  return data.results;
};

export const GenreMapping = async () => {
  // const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  //console.log("genre data ", data.genres);
  return data.genres;
};

// api.js
export const getGenreNames = (genreIds, genreMap) => {
  return genreIds.map((id) => genreMap[id] || "Unknown");
};


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

export const fetchMoviesByPage = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}`
  );
  const data = await res.json();
  return data.results || [];
};

export const fetchGenreByPage = async (page = 1, genreName) => {
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

    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error in fetchMoviesByGenreName:", error);
    return [];
  }
};

const API_KEY = "6660159448f862bc40e600fa9f9d874f";


const API_BASE = "http://localhost:8080/api/movies";

// export const getPopularMovies = async () => {
//   const res = await fetch(`${API_BASE}/popular`);
//   //console.log(res);
//   if (!res.ok) throw new Error("Failed to fetch popular movies");
//   const movies = res.json();
//   return movies || [];
// };

// export const searchMovies = async (query) => {
//   const res = await fetch(`${API_BASE}/search?query=${encodeURIComponent(query)}`);
//   if (!res.ok) throw new Error("Failed to search movies");
//   const movies = await res.json();
//   //console.log(movies);
//   return movies;
// };

// // ✅ Get movies by genre name
// export const fetchMoviesByGenreName = async (genreName) => {
//   const res = await fetch(`${API_BASE}/genre/${encodeURIComponent(genreName)}`);
//   if (!res.ok) throw new Error("Failed to fetch movies by genre");
//   return res.json();
// };

// // ✅ Get all genres
// export const getGenres = async () => {
//   const res = await fetch(`${API_BASE}/genres`);
//   if (!res.ok) throw new Error("Failed to fetch genres");
//   return res.json(); // returns an array of { id, name }
// };

// // ✅ Map genre IDs to names (client-side)
// export const getGenreNames = (genreIds, genreList) => {
//   const genreMap = {};
//   genreList.forEach((g) => (genreMap[g.id] = g.name));
//   return genreIds.map((id) => genreMap[id] || "no genre");
// };

// // ✅ Get movies by genre ID
// export const getMoviesByGenre = async (genreId) => {
//   const res = await fetch(`${API_BASE}/by-genre/${genreId}`);
//   if (!res.ok) throw new Error("Failed to fetch movies by genre ID");
//   return res.json();
// };