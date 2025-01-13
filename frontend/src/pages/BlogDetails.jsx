import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../styles/index.css";

const BlogDetails = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const url = `http://localhost:3000/api/blogs/${id}`;

  // Delete Blog
  const handleClick = () => {
    fetch(url, {
      method: "DELETE",
    }).then(() => {
      navigate("/blogs");
    });
  };

  useEffect(() => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    const token = loginInfo.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    fetch(url, { headers })
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="blog-details">
        <h2>Blog Details Page</h2>
        {blog && (
          <article>
            <h3>Title: {blog.title}</h3>
            {/* <p>Author is {blog.userId}</p> */}
            <div>Body: {blog.body}</div>
            <p>
              <a href={blog.mediaUrl}>Click Media link</a>
              <br /> <br />
            </p>
            <button onClick={handleClick}>Delete Blog</button>
          </article>
        )}
      </div>
    </>
  );
};

export default BlogDetails;
