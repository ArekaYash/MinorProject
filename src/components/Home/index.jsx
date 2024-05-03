import React from "react";
import Navbar from "../Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

const Home = () => {
  const creators = [
    {
      name: "Harshit Saraswat",
      description: "Backend Developer\n B.Tech. CSE (Spl.CSF)\n 3rd Year, UPES",
      imageUrl: "src/assets/Harshit.jpg",
      linkedinUrl:"https://www.linkedin.com/in/harshit-saraswat-848257125/"
    },
    {
      name: "Manan Singh",
      description: "Researcher\n B.Tech. CSE (Spl.CSF)\n 3rd Year, UPES",
      imageUrl: "src/assets/Manan.jpg",
    },
    {
      name: "Siddhant Srivastava",
      description:
        "Frontend Developer\n B.Tech.(H) CSE (Spl.CSF)\n 3rd Year, UPES",
      imageUrl: "src/assets/Siddhant1.JPG",
      linkedinUrl:"https://www.linkedin.com/in/siddhantsrivastava21/"
    },
    {
      name: "Yashvardhan Arekapudi",
      description:
        "Frontend Developer\n B.Tech.(H) CSE (Spl.CSF)\n 3rd Year, UPES",
      imageUrl: "src/assets/Yashvardhan.jpeg",
      linkedinUrl:"https://www.linkedin.com/in/yashvardhanarekapudi/"
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToScroll: 1
  };

  return (
    <>
      <Navbar />
      <div className="banner-img">
        <div className="title">
          <h3>
            <span>MINOR PROJECT</span> Web Portal
          </h3>
        </div>
        <p className="descript">
        Welcome to the Minor Project Selection Portal, a cutting-edge platform designed to revolutionize academic mentorship and project collaboration. In the dynamic world of academia, effective mentorship is key to nurturing students through their projects. However, traditional mentor-student pairing methods often lack efficiency and organization.
        </p>
        <p className="descript">
        Our portal addresses these challenges by offering a user-friendly interface that streamlines the project evaluation process. Not only Mentors, this portal is accessible to Evaluators and Academic Coordinator also. Students can add projects, choose mentors, and benefit from improved communication and collaboration. Mentors, on the other hand, can efficiently manage their mentees, optimize resource utilization, and set project deadlines. Evaluators can grade the projects and submit them to Academic Co-Ordinators who can monitor all the projects under them.
        </p>
        <br></br>
        <div className="carousel-container">
          <h2>About Us</h2>
          <Slider {...settings}>
            {creators.map((creator, index) => (
              <div key={index} className="slick-slide">
                <div className="card">
                {creator.linkedinUrl ? (
                    <a href={creator.linkedinUrl} target="_blank" rel="noopener noreferrer">
                      <img src={creator.imageUrl} alt={creator.name} />
                    </a>
                  ) : (
                    <img src={creator.imageUrl} alt={creator.name} />
                  )}
                  <div className="text">
                    <h4>{creator.name}</h4>
                    <p>{creator.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      </div>
    </>
  );
};

export default Home;
