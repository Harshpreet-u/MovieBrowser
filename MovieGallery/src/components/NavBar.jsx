import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { handleSuccess } from "../../utils";

export default function NavBar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("LoggedInUser");
    handleSuccess("User Logged out");
    setIsAuthenticated(false);
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/watchList" className="nav-link">
          WatchList
        </Link>
        <Link to="/watchLater" className="nav-link">
          WatchLater
        </Link>
        <Link to="/favorites" className="nav-link">
          Favourites
        </Link>

        {isAuthenticated ? (
          <Link className="nav-link" onClick={handleLogout}>
            Logout
          </Link>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
