import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import "./index.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="banner-img">
        <div className="title">
          <div className="small-tagline">
            <p>Portal for mentors to choose & schedule projects.</p>
          </div>
          <h3>
            <span>MINOR PROJECT</span> Web Portal
          </h3>
          <div className="small-tagline"></div>
        </div>
        <div className="button" data-testid="btn">
          <Link to="/projects">Projects</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
