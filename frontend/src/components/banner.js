
import logo from "../assets/logo.png";
import "../components/Banner.css";


function Banner() {
    const title = "Groupomania Home Page";
  return (
    <div className="jh-banner">
        <img src={logo} alt='Main Page' className="jh-logo" />
        <h1 className="jh-title">{title}</h1>
    </div>
  );
}

export default Banner;
