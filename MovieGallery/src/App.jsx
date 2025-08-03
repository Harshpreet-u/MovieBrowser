import "./css/App.css";
import MovieCard from "./components/MovieCard";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Favorites from "./pages/Favourites";
import { Routes, Route } from "react-router-dom";
import { WatchLaterProvider } from "./contexts/WatchLaterContext";
import { WatchListProvider } from "./contexts/WatchListContext";
import { MovieProvider } from "./contexts/MovieCContext";
import MovieDetails from "./pages/MovieDetails";
import GenrePage from "./pages/GenrePage";
import WatchLater from "./pages/WatchLater";
import WatchList from "./pages/WatchList";

function App() {
  return (
    <WatchListProvider>
      <WatchLaterProvider>
        <MovieProvider>
          <NavBar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Home/:id" element={<MovieDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/Genre/:genreName" element={<GenrePage />}></Route>
              <Route path="/watchLater" element={<WatchLater />} />
              <Route path="/watchList" element={<WatchList />} />
            </Routes>
          </main>
        </MovieProvider>
      </WatchLaterProvider>
    </WatchListProvider>
  );
}

export default App;
