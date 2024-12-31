import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import LoginSignup from "./LoginSignup";

function Blogs() {
  // const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",      
      Authorization: `Bearer ${loginInfo.token}`,
    };
    fetch("http://localhost:3000/api/blogs", { headers })
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h2>View the Blogs</h2>
        <ul>
          {blogs.map((item, index) => (
            <li key={index}>
              {item.id} | {item.title} | {item.body} | {item.author}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default Blogs;
