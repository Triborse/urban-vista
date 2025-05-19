import { Typewriter } from "react-simple-typewriter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "../styles/Home.css";
import Navbar from "./Navbar"; // Import Navbar component

const images = [
  "/images/image11.jpg",
  "/images/image2new.jpg",
  "/images/image10.avif",
  "/images/image4.jpg",
  "/images/image5.jpg",
  "/images/image7.jpg",
];

const Home = () => {
  const handleExploreClick = () => {
    const exploreSection = document.getElementById("explore");
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("Explore section not found.");
    }
  };

  const handleAboutContactClick = () => {
    const section = document.getElementById("about-contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Navbar onAboutContactClick={handleAboutContactClick} /> {/* Pass function as prop */}

      {/* Home Section */}
      <div className="home-container">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="background-slider"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="slide-overlay"></div>
              <img src={img} alt={`Slide ${i + 1}`} className="slide-image" />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Content Section */}
        <div className="content">
          <h2 className="typewriter-text">
            Experience
            <br />
            <span className="changing-text">
              <Typewriter
                words={["Nature", "Adventure", "Thrill"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h2>
          <button className="explore-btn" onClick={handleExploreClick}>
            Discover More..
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
