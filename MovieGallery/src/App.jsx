import "./css/App.css";
import MovieCard from "./components/MovieCard";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Favorites from "./pages/Favourites";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieCContext";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
