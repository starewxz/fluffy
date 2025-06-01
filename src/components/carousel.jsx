import { useRef } from 'react';
import { Carousel } from 'antd';
import dataSlippers from "../data-slippers.js";
import "../../styles/carousel.css";

const MyCarousel = () => {
    const carouselRef = useRef();

    const CustomPrevArrow = () => (
        <button
            onClick={() => carouselRef.current.prev()}
            className="custom-prev-arrow"
        >
            <img
                alt="previous"
                src={`${import.meta.env.BASE_URL}public/img/right-arrow.png`}
                style={{ transform: 'scaleX(-1)' }}
            />
        </button>
    );

    const CustomNextArrow = () => (
        <button
            onClick={() => carouselRef.current.next()}
            className="custom-next-arrow"
        >
            <img
                alt="next"
                src={`${import.meta.env.BASE_URL}public/img/right-arrow.png`}
            />
        </button>
    );

    return (
        <div className="antd-carousel-wrapper">
            <div className="carousel-edge carousel-edge-left"></div>
            <div className="carousel-edge carousel-edge-right"></div>

            <Carousel
                ref={carouselRef}
                autoplay
                dots={false}
                arrows={true}
                prevArrow={<CustomPrevArrow />}
                nextArrow={<CustomNextArrow />}
                className="custom-antd-carousel"
            >
                {dataSlippers.map((slipper) => (
                    <div key={slipper.id} className="carousel-slide">
                        <img
                            src={slipper.img}
                            alt={slipper.name}
                            className="carousel-image"
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default MyCarousel;