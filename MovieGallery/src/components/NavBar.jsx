import { Link } from "react-router-dom";
import "../css/Navbar.css"

export default function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/watchList" className="nav-link">WatchList</Link>
        <Link to="/watchLater" className="nav-link">WatchLater</Link>
        <Link to="/favorites" className="nav-link">Favourites</Link>
      </div>
    </div>
  );
}
