// import "./css/App.css";
// import MovieCard from "./components/MovieCard";
// import Home from "./pages/Home";
// import NavBar from "./components/NavBar";
// import Favorites from "./pages/Favourites";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { WatchLaterProvider } from "./contexts/WatchLaterContext";
// import { WatchListProvider } from "./contexts/WatchListContext";
// import { MovieProvider } from "./contexts/MovieCContext";
// import MovieDetails from "./pages/MovieDetails";
// import GenrePage from "./pages/GenrePage";
// import WatchLater from "./pages/WatchLater";
// import WatchList from "./pages/WatchList";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import { useState } from "react";
// import RefreshHandler from "./RefreshHandler";

// function App() {
//   const [isAuthrnticated, setIsAuthrnticated] = useState(false);

//   const PrivateRoute = ({ element }) => {
//     return isAuthrnticated ? element : <Navigate to="/" />;
//   };

//   return (
//     <WatchListProvider>
//       <WatchLaterProvider>
//         <MovieProvider>
//           <RefreshHandler setIsAuthrnticated={setIsAuthrnticated} />
//           <NavBar
//             isAuthrnticated={isAuthrnticated}
//             setIsAuthrnticated={setIsAuthrnticated}
//           />
//           <main className="main-content">
//             <Routes>
//               <Route
//                 path="/"
//                 element={
//                   <PrivateRoute
//                     element={
//                       <Home
//                         isAuthrnticated={isAuthrnticated}
//                         setIsAuthrnticated={setIsAuthrnticated}
//                       />
//                     }
//                   />
//                 }
//               />
//               <Route path="/Home/:id" element={<MovieDetails />} />
//               <Route path="/favorites" element={<Favorites />} />
//               <Route path="/Genre/:genreName" element={<GenrePage />} />
//               <Route path="/watchLater" element={<WatchLater />} />
//               <Route path="/watchList" element={<WatchList />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />
//             </Routes>
//           </main>
//         </MovieProvider>
//       </WatchLaterProvider>
//     </WatchListProvider>
//   );
// }

// export default App;

import "./css/App.css";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Favorites from "./pages/Favourites";
import { Routes, Route, Navigate } from "react-router-dom";
import { WatchLaterProvider } from "./contexts/WatchLaterContext";
import { WatchListProvider } from "./contexts/WatchListContext";
import { MovieProvider } from "./contexts/MovieCContext";
import MovieDetails from "./pages/MovieDetails";
import GenrePage from "./pages/GenrePage";
import WatchLater from "./pages/WatchLater";
import WatchList from "./pages/WatchList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState } from "react";
import RefreshHandler from "./RefreshHandler";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <WatchListProvider>
      <WatchLaterProvider>
        <MovieProvider>
          <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
          <NavBar isAuthenticated={isAuthenticated} />
          <main className="main-content">
            <Routes>
              {/* Home is public now */}
              <Route path="/Home" element={<Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />

              {/* Movie details public */}
              <Route path="/Home/:id" element={<MovieDetails />} />

              {/* Protected routes */}
              <Route
                path="/favorites"
                element={<PrivateRoute element={<Favorites />} />}
              />
              <Route
                path="/watchLater"
                element={<PrivateRoute element={<WatchLater />} />}
              />
              <Route
                path="/watchList"
                element={<PrivateRoute element={<WatchList />} />}
              />

              {/* Public pages */}
              <Route path="/Genre/:genreName" element={<GenrePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
        </MovieProvider>
      </WatchLaterProvider>
    </WatchListProvider>
  );
}

export default App;
