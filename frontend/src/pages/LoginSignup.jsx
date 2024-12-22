import React, { useState } from "react";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
import userIcon from "../assets/user.png";
import "../styles/LoginSignup.css";

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
  // console.log("Userinfo: " + fullName + " " + email + " " + password);

  return (
    <div className="container">
      <div className="header">
        <div className="name">{action}</div>
        <div className="underline"></div>
        <div>
          <br />
          <a href="http://localhost:4200/">HOME</a>
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
              placeholder="Fullname"
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
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Sign Up");
            postData("Signup");
          }}
        >
          Sign Up
        </div>
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
          fullname: userInfo.fullName,
        }),
      })
        .then((res) => {
          if (res.ok && email !== "") {
            alert("User Signup successfully");
          } else if (email !== "") {
            alert("Something is wrong with the user Signup");
          }
          return res.json();
        })
        .then((data) => {
          // TODO Set msg to Login to automatically log in the user
          console.log(data);
        })
        .catch((error) => console.log("ERROR"));
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
          if (res.ok && email !== "") {
            alert("User Login successfully");
          } else if (email !== "") {
            alert("Something is wrong with the user Login");
          }
          return res.json();
        })
        .then((data) => {
          // TODO Add userinfo to Local Storage
          // TODO Use React Router to send user to the Home Page
          console.log(data);
        })
        .catch((error) => console.log("ERROR"));
    }
  }
};

export default LoginSignup;
