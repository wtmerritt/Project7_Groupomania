
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Blog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/blog")
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
export default Blog;
