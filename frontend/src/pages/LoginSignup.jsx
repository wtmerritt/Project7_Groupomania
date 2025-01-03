import { useState } from "react";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
import userIcon from "../assets/user.png";
import "../styles/LoginSignup.css";
import { useNavigate } from "react-router-dom";

// Regex Expressions
// const regUser = /^[A-Za-z- .]{4,25}$/;
// const regEmail = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})$/;
// const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

// User Signup or Login process
const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // const [loginInfo, setloginInfo] = useState("");
  

  // Clear out LocalStorage
  localStorage.clear();

  // useEffect(() => {
  //   console.log(data);
  //   const data = localStorage.getItem("email");
  //   if (data) {
  //     setEmail(JSON.parse(data));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("email", JSON.stringify(email));
  //   // localStorage.setItem('password', JSON.stringify(password));
  // });

  return (
    <div className="container">
      {error && <div>{error}</div>}
      <div className="header">
        <div className="name">{action}</div>
        <div className="underline"></div>
        <div>
          <br />
          {/* <a href="http://localhost:4200/">HOME</a> */}
        </div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={userIcon} alt="" />
            <input
              type="text"
              placeholder="FullName"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        )}
        <div className="input">
          <img src={emailIcon} alt="" />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <img src={passwordIcon} alt="" />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="submit-container">
        {/* {error && <div>{error}</div>} */}
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Sign Up");
            postData("Signup");
          }}
        >
          Sign Up
        </div>
        {/* {error && <div>{error}</div>} */}
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Login");
            postData("Login");
          }}
        >
          Login
        </div>
      </div>
    </div>
  );

  // OnSubmit of the Signup or Login button
  function postData(msg) {
    // e.preventDefault();
    const userInfo = { fullName, email, password };
    console.log(userInfo);

    if (msg === "Signup") {
      fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userInfo.email,
          password: userInfo.password,
          fullName: userInfo.fullName,
        }),
      })
        .then((res) => {
          if (fullName === "" && email === "" && password === "") {
            setError(null);
          } else if (res.ok && email !== "") {
            setError(null);
            navigate("/login");
            postData("Login");
          } else {
            throw new Error(
              "Could not complete the Signup process. Please try again."
            );
          }

          return res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          setError(err.message);
          // console.log(err.message);
        });
    } else if (msg === "Login") {
      fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userInfo.email,
          password: userInfo.password,
        }),
      })
        .then((res) => {
          if (email === "" || password === "") {
            setError(null);
          } else if (res.ok && email !== "") {
            setError(null);
            navigate("/blogs");
          } else {
            throw new Error(
              "Incorrect email or password info. Please enter the correct information."
            );
          }

          return res.json();
        })
        .then((data) => {
          // console.log("res data = ", data);
          // // TODO Add userinfo to Local Storage
          // // TODO Use React Router to send user to the Home Page
          
          const token = data.token;
          
          localStorage.setItem("token", JSON.stringify(token));
          localStorage.setItem("loginInfo", JSON.stringify(data));
          localStorage.setItem("email", JSON.stringify(email));
          
        })
        .catch((err) => {
          setError(err.message);
          // console.log(err.message);
        });
    }
  }
};

export default LoginSignup;
