import "../styles/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {  
  return (
    <nav className="navbar">
      <div className="links">
        <Link to="/create">Create New Blog</Link>
        <Link to="/blogs">View Blogs</Link>
        <Link to="/deleteaccount">Delete Account</Link>
        <Link to="/signup">Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;
