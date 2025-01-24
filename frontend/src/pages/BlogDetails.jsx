import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Banner from "../components/banner";
import "../styles/LoginSignup.css";
import "../styles/index.css";
let videoFile = "";
let audioFile = "";
let imageFile = "";

const BlogDetails = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});

  const { id } = useParams();
  const url = `http://localhost:3000/api/blogs/${id}`;
  const urlRead = `http://localhost:3000/api/blogs/${id}/read`;
  const [read, setRead] = useState(0);
  const fileExt = "";

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
    .then((data) => {
      setBlog(data);
      const fileExt = data.mediaUrl.split(".").pop();
      if (fileExt === "mp4") {
        videoFile = true;
        console.log("Video fileExt = " + fileExt);
      } else if (fileExt === "mp3") {
        audioFile = true;
        console.log("Audio fileExt = " + fileExt);
      } else if (fileExt === "png") {
        imageFile = true;
        console.log("Image fileExt = " + fileExt);
      }
    })
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
        console.log("Blog is Marked.");
      } else {
        console.log("Blog is not Marked.");
      }
    })

    .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Banner /> 
      <Navbar />
      <div className="blog-details">
        <h2>Blog Details Page</h2>

        {blog && (
          <article>
            <br />
            <h3>Title: {blog.title}</h3>
            <div>Body: {blog.body}</div>
            <p>
              {videoFile ? (
                <video
                  src={blog.mediaUrl}
                  width="420"
                  height="320"
                  type="video/mp4"
                  controls
                ></video>
              ) : audioFile ? (
                <audio src={blog.mediaUrl} type="audio/mp3" controls></audio>
              ) : imageFile ? (
                <img
                  src={blog.mediaUrl}
                  width="420"
                  height="320"
                  alt="Water & Boat"
                />
              ) : null}
            </p>
          </article>
        )}
      </div>
    </>
  );
};

export default BlogDetails;
