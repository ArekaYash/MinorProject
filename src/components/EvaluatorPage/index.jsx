import React from "react";
import Navbar from "../Navbar";
import "./index.css";

const EvaluatorPage = () => {
  return (
    <>
      <Navbar isAuthenticated={true} userRole={"faculty-AC"} />
      <div className="banner-img">

      <div className="page-container">
        <h2>Evaluator Page</h2>
        <p>Welcome, Evaluator!</p>
      </div>
      </div>
    </>
  );
};

export default EvaluatorPage;
