const API_KEY = "6660159448f862bc40e600fa9f9d874f";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

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
};
