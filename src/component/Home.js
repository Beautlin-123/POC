import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

  return (
    <Slider {...settings}>
      <div>
        <img src="https://tse2.mm.bing.net/th/id/OIP.6-3oxAmhpuDVT1z8d2spywHaEK?w=305&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="Image 1" style={{height:"100%",width:"100%"}} />
      </div>
      <div>
        <img src="https://tse3.mm.bing.net/th/id/OIP.UXrUWC-4JVheYk3-8D2CzAHaEX?rs=1&pid=ImgDetMain" alt="Image 2" style={{height:"100%",width:"100%"}} />
      </div>
      <div>
        <img src="https://tse4.mm.bing.net/th/id/OIP.WGxtnw81X7exO2PxiVlL9QHaEK?w=263&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="Image 3" style={{height:"100%",width:"100%"}} />
      </div>
      <div>
        <img src="https://tse2.mm.bing.net/th/id/OIP.7KNnhQtDAAv4aG1wvyLBaAHaD4?w=329&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="Image 4" style={{height:"100%",width:"100%"}}/>
      </div>
    </Slider>
  );
}

export default Home;


