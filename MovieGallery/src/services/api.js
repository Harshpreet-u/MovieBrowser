const API_KEY = "6660159448f862bc40e600fa9f9d874f";
const BASE_URL = "https://api.themoviedb.org/3";

console.log("api key= ", API_KEY);

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

export const getGenreNames = (genreIds, genreList) => {
  // console.log("genreIds:", genreIds);
  // console.log("genreMap inside getGenreNames:", genreList);
  const genreMap = {};
  genreList.forEach((g) => (genreMap[g.id] = g.name));

  return genreIds.map((id) => genreMap[id] || "no genre");
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

// const API_BASE = "http://localhost:8080/api/lists";

// // GET lists
// export async function getLists(token) {
//   const res = await fetch(API_BASE, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   return res.json();
// }

// // ADD to list
// export async function addToList(listType, movieId, token) {
//   await fetch(`${API_BASE}/${listType}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`
//     },
//     body: JSON.stringify({ movieId })
//   });
// }

// // REMOVE from list
// export async function removeFromList(listType, movieId, token) {
//   await fetch(`${API_BASE}/${listType}/${movieId}`, {
//     method: "DELETE",
//     headers: { Authorization: `Bearer ${token}` }
//   });
// }

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// function getToken() {
//   return localStorage.getItem('token');
// }

// async function request(url, method = 'GET', body) {
//   const res = await fetch(`${API_URL}${url}`, {
//     method,
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${getToken()}`
//     },
//     body: body ? JSON.stringify(body) : undefined
//   });

//   if (!res.ok) {
//     // const text = await res.text();
//     // throw new Error(text || res.statusText);
//     console.log("error");
//   }
//   return res.json();
// }

// // Lists API
// export const getUserLists = () => request('/lists');

// export const addToList = (listType, movieId) =>
//   request(`/lists/${listType}`, 'POST', { movieId });

// export const removeFromList = (listType, movieId) =>
//   request(`/lists/${listType}/${movieId}`, 'DELETE');

// export default {
//   getUserLists,
//   addToList,
//   removeFromList
// };
