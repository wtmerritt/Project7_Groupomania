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
  const urlRead = `http://localhost:3000/api/blogs/${id}/read`;
  const [read, setRead] = useState(0);

  useEffect(() => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    const token = loginInfo.token;
    const userId = loginInfo.userId;

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    fetch(url, { headers })
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.log(err));

    fetch(urlRead, {
      method: "POST",
      headers,
      body: JSON.stringify({
        userId,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Mark Post ...");
        } else {
          console.log("Mark is not Posted ...");
        }
      })

      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="blog-details">
        <h2>Blog Details Page</h2>

        {blog && (
          <article>
            <p>Blog read: {read + 1}</p>
            <br />
            <h3>Title: {blog.title}</h3>
            <div>Body: {blog.body}</div>
            <p>
              <a href={blog.mediaUrl}>{blog.mediaUrl}</a>
            </p>
          </article>
        )}
      </div>
    </>
  );
};

export default BlogDetails;
