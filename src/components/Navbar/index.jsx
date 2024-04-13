import { Link } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  return (
    <>
      <div className="main-page">
        <nav id="navbar">
          <h1 className="logo">
            Mentor<span>Portal</span>
          </h1>

          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/add-project">Add Project</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
