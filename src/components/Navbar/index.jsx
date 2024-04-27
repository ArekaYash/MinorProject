import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./index.css";

const Navbar = ({ isAuthenticated, userRole }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const isActiveRoute = (routePath) => {
    return location.pathname === routePath;
  };

  const handleLogout = () => {
    logout(); // Call logout function
  };
  const facultyACNavbar = () => {
    return (
      <>
        <li>
          <Link
            to="/projects"
            className={isActiveRoute("/projects") ? "active" : ""}
          >
            Projects
          </Link>
        </li>
      </>
    );
  };
  const facultyEvalNavbar = () => {
    return (
      <>
        <li>
          <Link
            to="/projects"
            className={isActiveRoute("/projects") ? "active" : ""}
          >
            Projects
          </Link>
        </li>

        <li>
          <Link
            to="/schedule"
            className={isActiveRoute("/schedule") ? "active" : ""}
          >
            Schedule
          </Link>
        </li>
      </>
    );
  };
  const handleAddProject = () => {
    navigate("/add-project", { state: { accessToken: localStorage.getItem("accessToken") } }); 
  };
  const studentsNavbar = () => {
    return (
      <>
        <li>
        <button className="add-project-btn" onClick={handleAddProject}>
            Add Project
          </button>
        </li>
      </>
    );
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

            {isAuthenticated && userRole === "faculty-AC" && facultyACNavbar()}
            {isAuthenticated &&
              userRole === "faculty-eval" &&
              facultyEvalNavbar()}
            {isAuthenticated && userRole === "student" && studentsNavbar()}
            {!isAuthenticated && (
              <li>
                <Link
                  to="/login"
                  className={isActiveRoute("/login") ? "active" : ""}
                >
                  Login
                </Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <Link
                  to="/login"
                  className={isActiveRoute("/login") ? "active" : ""}
                >
                  <button className={"logout"} onClick={handleLogout}>Logout</button>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
