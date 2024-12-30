import Banner from "../components/banner";
import "../styles/Home.css";
import { Navigate } from "react-router-dom";

function Home() {
  const loggedIn = false;

  return (
    <>
      {loggedIn ? <h1>Login Page</h1> : <Navigate to="/login" />}
      <Banner />
      <div className="home">
        <ul>
          {/* <li>
            <a href="http://localhost:4200/create">Create Blog</a>
          </li>
          <li>
            <a href="http://localhost:4200/blog">View Blogs</a>
          </li> */}
          <li>
            <a href="http://localhost:4200/signup">Sign Up</a>
          </li>
          <li>
            <a href="http://localhost:4200/login">Login</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Home;
