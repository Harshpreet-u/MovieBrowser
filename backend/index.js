const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
require("dotenv").config();
require("./Models/db");
const axios = require("axios");

let genreCache = {
  data: null,
  lastFetched: 0,
};
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/auth", AuthRouter);

const BASE_URL = "https://api.themoviedb.org/3";
let API_KEY = process.env.API_KEY;

// ✅ Get popular movies
app.get("/api/movies/popular", async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}`);
    const data = await response.json();
    res.json(data.results || []);
  } catch (err) {
    console.error("Error fetching popular movies:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Search movies
app.get("/api/movies/search", async (req, res) => {
  try {
    const query = req.query.query;
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US`
    );
    const data = await response.json();
    res.json(data.results || []);
  } catch (err) {
    console.error("Error searching movies:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// // ✅ Get movies by genre name
// app.get("/api/movies/genre/:genreName", async (req, res) => {
//   try {
//     const genreName = req.params.genreName;
//     const genresRes = await fetch(
//       `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
//     );
//     const genresData = await genresRes.json();

//     const selectedGenre = genresData.genres.find(
//       (g) => g.name.toLowerCase() === genreName.toLowerCase()
//     );
//     if (!selectedGenre) {
//       return res.status(404).json({ error: "Genre not found" });
//     }

//     const moviesRes = await fetch(
//       `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre.id}`
//     );
//     const moviesData = await moviesRes.json();

//     res.json(moviesData.results || []);
//   } catch (error) {
//     console.error("Error fetching movies by genre:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Get all genres (only GET now)
// // app.get("/api/movies/genres", async (req, res) => {
// //   try {
// //     console.log("Fetching genres from TMDB...");
// //     const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
// //     console.log("TMDB URL:", url);

// //     const response = await fetch(url);
// //     console.log("TMDB Status:", response.status);

// //     if (!response.ok) {
// //       const errText = await response.text();
// //       console.error("TMDB Error Response:", errText);
// //       return res.status(response.status).json({ error: errText });
// //     }

// //     const data = await response.json();
// //     console.log("TMDB Genre Data:", data);
// //     res.json(data.genres);
// //   } catch (error) {
// //     console.error("Error fetching genres:", error);
// //     res.status(500).json({ error: error.message || "Failed to fetch genres" });
// //   }
// // });

// app.get("/api/movies/genres", async (req, res) => {
//   try {
//     // 1. Check cache first
//     const now = Date.now();
//     if (genreCache.data && now - genreCache.lastFetched < CACHE_TTL) {
//       console.log("Serving genres from cache...");
//       return res.json(genreCache.data);
//     }

//     // 2. Build TMDB request
//     const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
//     console.log("Fetching genres from TMDB:", url);

//     // 3. Fetch from TMDB using axios
//     const response = await axios.get(url, {
//       headers: { Accept: "application/json" },
//       timeout: 5000, // 5 sec timeout so it won't hang forever
//     });

//     if (!response.data || !response.data.genres) {
//       throw new Error("Invalid response from TMDB");
//     }

//     // 4. Cache results
//     genreCache.data = response.data.genres;
//     genreCache.lastFetched = now;

//     // 5. Send back genres
//     res.json(response.data.genres);

//   } catch (error) {
//     console.error("Error fetching genres:", error.message);

//     // Handle ECONNRESET or timeout gracefully
//     if (error.code === "ECONNRESET") {
//       return res.status(502).json({ error: "Connection to TMDB was reset" });
//     }
//     if (error.code === "ECONNABORTED") {
//       return res.status(504).json({ error: "TMDB request timed out" });
//     }

//     // Fallback to cached data if available
//     if (genreCache.data) {
//       console.warn("Serving stale cached genres due to error...");
//       return res.json(genreCache.data);
//     }

//     // Otherwise return error
//     res.status(500).json({ error: error.message });
//   }
// });


// // ✅ Get movies by genre ID
// app.get("/api/movies/by-genre/:genreId", async (req, res) => {
//   const { genreId } = req.params;
//   try {
//     const response = await fetch(
//       `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US&sort_by=popularity.desc`
//     );
//     if (!response.ok) throw new Error("Failed to fetch movies by genre");

//     const data = await response.json();
//     res.json(data.results || []);
//   } catch (err) {
//     console.error("Error fetching movies by genre:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

app.get("/ping", (req, res) => {
  res.send("here at ping");
});

app.get("/", (req, res) => {
  res.send("Hello from the backend root!");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
