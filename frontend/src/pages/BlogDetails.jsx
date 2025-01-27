import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Banner from "../components/banner";
import "../styles/LoginSignup.css";
import "../styles/index.css";

const BlogDetails = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const [videoFile, setVideoFile] = useState(false);
  const [audioFile, setAudioFile] = useState(false);
  const [imageFile, setImageFile] = useState(false);

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
          setVideoFile(true);
        } else if (fileExt === "mp3") {
          setAudioFile(true);
        } else if (fileExt === "png") {
          setImageFile(true);
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
              {videoFile && (
                <video
                  src={blog.mediaUrl}
                  width="420"
                  height="320"
                  type="video/mp4"
                  controls
                ></video>
              )}
              {audioFile && (
                <audio src={blog.mediaUrl} type="audio/mp3" controls></audio>
              )}
              {imageFile && (
                <img
                  src={blog.mediaUrl}
                  width="420"
                  height="320"
                  alt="Water & Boat"
                />
              )}
            </p>
          </article>
        )}
      </div>
    </>
  );
};

export default BlogDetails;
