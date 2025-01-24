import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Banner from "../components/banner";
import "../styles/LoginSignup.css";
import "../styles/index.css";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState({});
  const email = JSON.parse(localStorage.getItem("email"));
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const token = loginInfo.token;
  const id = loginInfo.userId;

  // Delete Account
  const handleClick = (e) => {    
    const url = `http://localhost:3000/api/auth/${id}`;

    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    fetch(url, deleteOptions)
      .then((res) => res.json())
      .then((data) => {
        setAccount(data);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Banner />
      <Navbar />
      <div className="account-details">
        <h2>Account Information</h2>
        {account && (
          <article>
            <h3>User: {email}</h3>
            <p>
              <br />
              <br />
            </p>

            <button onClick={handleClick}>Delete Account</button>
          </article>
        )}
      </div>
    </>
  );
};

export default DeleteAccount;
