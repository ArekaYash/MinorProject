import { useState } from "react";
import "./index.css";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const Schedule = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const OnformSubmit = () => {
    if (!selectedDate) {
      alert("Please select a date first");
    } else {
      alert("Project has been successfully scheduled.");
      navigate("/projects");
    }
  };

  return (
    <>
      <Navbar />
      <div className="banner-img">

        <div className="apply-job">
          <div className="container">

            <h2><span>Select Date</span></h2>


            <Calendar onChange={setSelectedDate} value={selectedDate} />
            <br />
            <button
              type="submit"
              className="button"
              onClick={OnformSubmit}
            >
              Submit
            </button>


          </div>
        </div>
      </div>
    </>
  );
};

export default Schedule;
