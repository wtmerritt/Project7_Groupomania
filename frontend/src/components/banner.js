
// import logo from "../assets/logo.png";
import logo from "../assets/icon.jpeg";
import "../components/Banner.css";


function Banner() {
    const title = "Groupomania Website";
  return (
    <div className="jh-banner">
        <img src={logo} alt='Main Page' className="jh-logo" />
        <h1 className="jh-title">{title}</h1>
    </div>
  );
}

export default Banner;
