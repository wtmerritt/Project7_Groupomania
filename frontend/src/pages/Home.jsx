import Banner from "../components/banner";
import "../styles/Home.css";

function Home() {
  return (
    <>
      <Banner />
      <div className="home">
        <ul>
          <li>
            <a href="http://localhost:4200/signup">SIGN UP</a>
          </li>
          <li>
            <a href="http://localhost:4200/login">LOGIN</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Home;
