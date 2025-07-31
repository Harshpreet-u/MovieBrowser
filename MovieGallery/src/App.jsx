import "./css/App.css";
import MovieCard from "./components/MovieCard";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Favorites from "./pages/Favourites";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieCContext";
import MovieDetails from "./pages/MovieDetails";
// import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
// import { faList, faClock } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
