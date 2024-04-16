import React from 'react';
import Navbar from '../Navbar';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';

const Home = () => {
  const creators = [
    {
      name: 'Harshit Saraswat',
      description: 'Backend Developer\n B.Tech. CSE (Spl.CSF)\n 3rd Year,UPES',
      imageUrl: 'src/assets/Harshit.jpg',
    },
    {
      name: 'Manan Singh',
      description: 'Researcher\n B.Tech. CSE (Spl.CSF)\n 3rd Year,UPES',
      imageUrl: '',
    },
    {
      name: 'Siddhant Srivastava',
      description: 'Frontend Developer\n B.Tech.(H) CSE (Spl.CSF)\n 3rd Year,UPES',
      imageUrl: 'src/assets/Siddhant.JPG',
    },
    {
      name: 'Yashvardhan Arekapudi',
      description: 'Frontend Developer\n B.Tech.(H) CSE (Spl.CSF)\n 3rd Year,UPES',
      imageUrl: 'src/assets/Yashvardhan.jpeg',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
        <p className='descript' >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto ab, corrupti nostrum corporis enim officiis, voluptatum eligendi atque id dolorum, voluptatem explicabo saepe tenetur impedit est quae velit harum fugit! Natus fugiat veritatis alias, tempore numqtibus atque nostrum magnam ab fugit error natus aliquid quis facere eveniet provident cupiditate ducimus exercitationem excepturi accusantium hic soluta fugiat molestiae, maiores eprehenderit provident? Corrupti facere ex, doloremque labore esse ullam, at quaerat consequatur blanditiis fuga nulla minus veniam perferendis quo fugiat obcaecati snctio culpa, quis hic necessitatibus mollitia vel suscipit, quos doloribus officia dolor earum excepturi commodi esse nam tempora fugiat error. Et repellat sint veniam. Amet dolor qui veritatis debitis nihil cumque id possimus aut sint atque eligendi molestias saepe corrupti earum expedita dolores aliquam sit nisi, obcaecati commodi quos unde recusandae! Earum numquam delectus animi quae voluptatum molestiae quidem beatae maxime corrupti cupiditate!

        </p>
        <br></br>
        <div className="carousel-container">
          <h2>About Us</h2>
          <Slider {...settings}>
            {creators.map((creator, index) => (
              <div key={index} className="slick-slide">
                <div className="card">

                  <img src={creator.imageUrl} alt={creator.name} />
                  <div className="text">

                    <h4>{creator.name}</h4>
                    <p>{creator.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Home;
