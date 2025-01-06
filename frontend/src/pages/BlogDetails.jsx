import { useParams } from "react-router-dom";
import Blogs from "./Blogs";

const BlogDetails = () => {
  const { id } = useParams();  
  const { blogs: blog } = Blogs("http://localhost:3000/api/blogs" + id);
  console.log("Blog details = " + blog); 

  return (
    <div className="blog-details">
      <h2>Blog Details - {id}</h2>
      {/* {blog && (
        <h2>{blog.title}</h2>
        // <p>Author is {blog.author}</p>
      )} */}
    </div>
  );
};

export default BlogDetails;
