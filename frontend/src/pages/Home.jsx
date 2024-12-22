import Banner from "../components/banner";
import "../styles/Home.css";

function Home() {
  return (
    <>
      <Banner />
      <div className="home">
        <ul>
          <li>
            <a href="http://localhost:4200/create">Create Blog</a>
          </li>
          <li>
            <a href="http://localhost:4200/blog">View Blogs</a>
          </li>
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
