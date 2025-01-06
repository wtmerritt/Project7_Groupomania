import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import LoginSignup from "./LoginSignup";

function Blogs() {
  // const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);

  // const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const url = "http://localhost:3000/api/blogs";

  useEffect(() => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    const token = loginInfo.token;
    // console.log("token = " + token);
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    fetch(url, { headers })
      .then((res) => res.json())
      .then((data) => setBlogPosts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h2>View the Blogs</h2>
        <ul>
          {Array.isArray(blogPosts) &&
            blogPosts.map((blog, index) => (
              <div className="blog-preview" key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                  <ul key={index}>
                    {blog.title} | {blog.body} | {blog.author}
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
