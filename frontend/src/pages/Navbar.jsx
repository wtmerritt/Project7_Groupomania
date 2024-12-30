import "../styles/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
// const Navbar = () => {
  return (
    <nav className="navbar">
      {/* <h1>The Blog Page</h1> */}
      <div className="links">
        {/* <Link to="/">Home</Link> */}
        <Link to="/create">Create New Blog</Link>
        <Link to="/blogs">View Blogs</Link>
        <Link to="/signup">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
