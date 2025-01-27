import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/index.css";
import LoginSignup from "./LoginSignup";
import Banner from "../components/banner";
import "../styles/LoginSignup.css";

function Blogs() {
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const token = loginInfo.token;
  const userId = loginInfo.userId;
  const [blogPosts, setBlogPosts] = useState([]); 

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const url = "http://localhost:3000/api/blogs";
 
  useEffect(() => {
    fetch(url, { headers })
      .then((res) => res.json())
      .then((data) => {
        setBlogPosts(data);   
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Banner />
      <Navbar />
      <div className="blog-view">
        <h2>View the Blogs</h2>

        <ul>
          {Array.isArray(blogPosts) &&
            blogPosts.map((blog, index) => (
              <div className="blog-preview" key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                  <ul key={index}>
                    {blog.title}: {blog.body} -- Blog
                    {blog.read.includes(userId) ? " read" : " unread"}
                  </ul>
                </Link>
              </div>
            ))}
        </ul>
      </div>
    </>
  );
}
export default Blogs;
