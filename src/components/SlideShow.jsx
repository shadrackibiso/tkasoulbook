import React, { useState } from "react";
import "../css/slideshow.css";
import { MdEdit } from "react-icons/md";
import SlideShowModal from "../components/SlideShowModal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageModal from "./ImageModal";

function SlideShow(props) {
  const [modalImage, setModalImage] = useState(null);

  const openModal = () => {
    document.querySelector(".slideShowModal").style.display = "flex";
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="slideShowContainer">
      <div className="slideShowImageContainer">
        <Slider {...settings}>
          {props.slideShowPics &&
            props.slideShowPics
              .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
              .map((pic, i) => (
                <img
                  key={i}
                  src={pic.src}
                  alt="banner"
                  className="slideShowImage"
                  onClick={() => setModalImage(pic.src)}
                />
              ))}
        </Slider>
      </div>
      {/* Modal to display single images */}
      <div style={{ display: !modalImage && "none" }}>
        <ImageModal src={modalImage} closeModal={() => setModalImage(null)} />
      </div>
      {/* edit button */}
      <div
        className="slideShowEditBtn"
        onClick={openModal}
        style={{
          display:
            (props.accountType &&
              props.accountType.toLowerCase() === "member" &&
              "none") ||
            (props.accountType &&
              props.accountType.toLowerCase() === "soul establishment" &&
              "none"),
        }}
      >
        <MdEdit />
      </div>
      {/* modal to display all images */}
      <SlideShowModal {...props} />
    </div>
  );
}

export default SlideShow;
