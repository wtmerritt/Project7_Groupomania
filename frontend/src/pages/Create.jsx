import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "../styles/index.css";

function Create() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // const [userId, setUserId] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();
  const url = "http://localhost:3000/api/blogs";

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    const userId = loginInfo.userId;
    const blog = { title, body, userId };
    console.log("localStorage loginToken = " + loginInfo.token);
    const data = new FormData();

    if (file) {
      // console.log("media file = " + file);
      data.append("blog", JSON.stringify(blog));
      data.append("media", file);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${loginInfo.token}`,
        },
      };
      axios
        .post(url, data, config)
        .then((res) => {
          // setUploadedFileURL(res.data.files);
          navigate("/blogs");
        })
        .catch((error) => {
          console.error("Error uploading file: ", error);
          // setError(error);
        });
    } else {
      console.log("media is not found");
      const blog = {
        title,
        body,
        userId,
      };

      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${loginInfo.token}`,
        },
      };
      axios
        .post(url, blog, config)
        .then((res) => {
          console.log(res.data);
          navigate("/blogs");
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    }
  };

  return (
    <>
      <Navbar />
      <div className="create">
        <h2>Add a New Blog</h2>
        <form onSubmit={handleSubmit}>
          <label>Blog title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Blog body:</label>
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>

          <label>File Upload:</label>
          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button>Add Blog</button>
        </form>
      </div>
    </>
  );
}

export default Create;
