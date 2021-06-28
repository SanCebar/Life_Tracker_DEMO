import { NavLink as Link } from "react-router-dom"
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="content">
        <span className="logo"><Link to="/">Life Tracker</Link></span>
        <ul className="pages">
          <li><Link to="/activity" activeClassName="active" end >Activity</Link></li>
          <li><Link to="/exercises" activeClassName="active" end >Exercises</Link></li>
          <li><Link to="/nutrition" activeClassName="active" end >Nutrition</Link></li>
        </ul>
        <span className="user-buttons">
          <Link to="/login" activeClassName="active" end >
            <button className="skewBtn login-button">Login</button>
          </Link>
          <Link to="/register" activeClassName="active" end >
            <button className="skewBtn sign-up-button">Sign Up</button>
          </Link>
        </span>
      </div>
    </nav>
  );
}
