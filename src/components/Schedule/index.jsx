import { useState } from "react";
import "./index.css";
import Calendar from "react-calendar"; // Import Calendar component
import { useNavigate } from "react-router-dom";

const Schedule = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to track selected date

  const OnformSubmit = () => {
    if (!selectedDate) {
      alert("Please select a date first");
    } else {
      alert("Project has been successfully scheduled.");
      navigate("/projects");
    }
  };

  return (
    <div className="apply-job">
      <div className="container">
        <header className="header">
          <h1 className="post">Select Date</h1>
        </header>

        <Calendar onChange={setSelectedDate} value={selectedDate} />
        <form>
          <div className="form-group">
            <button
              type="submit"
              className="submit-button"
              onClick={OnformSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Schedule;
