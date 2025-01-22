import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import LoginSignup from "./LoginSignup";
import Create from './Create';
import Blogs from "./Blogs";
import BlogDetails from "./BlogDetails";
import DeleteAccount from "./DeleteAccount";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/signup" element={<LoginSignup />} />       
          <Route path="/deleteaccount" element={<DeleteAccount />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
