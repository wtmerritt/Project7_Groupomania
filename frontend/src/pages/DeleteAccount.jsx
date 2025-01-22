import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import "../styles/index.css";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState({});

  // Delete Account
  const handleClick = (e) => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    const token = loginInfo.token;
    const id = loginInfo.userId;
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
      <Navbar />
      <div className="account-details">
        <h2>Account Information</h2>
        {account && (
          <article>
            <h3>Email: {account.email}</h3>
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
