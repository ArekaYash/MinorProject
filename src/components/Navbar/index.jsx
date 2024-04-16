import { Link, useLocation } from "react-router-dom";
import "./index.css";

const Navbar = ({isAuthenticated}) => {
  const location = useLocation();
  const isActiveRoute = (routePath) => {
    return location.pathname === routePath;
  };

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

            {isAuthenticated && (
          <>
            <li>
              <Link
                to="/projects"
                className={isActiveRoute('/projects') ? 'active' : ''}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="/add-project"
                className={isActiveRoute('/add-project') ? 'active' : ''}
              >
                Add Project
              </Link>
            </li>
          </>
        )}
            <li>
              <Link to="/login"className={isActiveRoute('/login')?'active':''}> Login </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
