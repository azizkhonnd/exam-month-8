import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { Carousel } from 'antd';
import { useRef } from 'react';
import type { CarouselRef } from 'antd/es/carousel';
import './Hero.scss';

const Hero = () => {
    const carouselRef = useRef<CarouselRef>(null);

    const handleVideoEnd = () => {
        if (carouselRef.current) {
            carouselRef.current.next();
        }
    };

    const nextSlide = () => {
        if (carouselRef.current) {
            carouselRef.current.next();
        }
    };

    const prevSlide = () => {
        if (carouselRef.current) {
            carouselRef.current.prev();
        }
    };

    return (
        <div className="container hero__container">
            <Carousel autoplay={true} ref={carouselRef} className="hero__carousel">
                
                <div>
                    <div className="content__style">
                        <video
                            className="video-slide"
                            src="https://i.makeupstore.uz/video/p/pq/pqj4dh0xxpp2.mp4"
                            autoPlay
                            loop={false}
                            muted
                            onEnded={handleVideoEnd}
                        />
                    </div>
                </div>
                <div>
                    <div className="content__style">
                        <img
                            className="image-slide"
                            src="https://i.makeupstore.uz/q/qo/qo3vl7tybvoe.jpg"
                            alt="Slide 3"
                        />
                    </div>
                </div>
                <div className="content__style">
                    <img
                        className="image-slide"
                        src="https://i.makeupstore.uz/q/q5/q5n2aismwfde.jpg"
                        alt="Back to Office Sale_main"
                        loading="lazy"
                    />
                </div>
                <div>
                    <div className="content__style">
                        <video
                            className="video-slide"
                            src="https://i.makeupstore.uz/video/h/h6/h6dtodtowpfb.mp4"
                            autoPlay
                            loop={false}
                            muted
                            onEnded={handleVideoEnd}
                        />
                    </div>
                </div>
            </Carousel>

            <button className="prev-btn" onClick={prevSlide}>
                <IoIosArrowBack />
            </button>
            <button className="next-btn" onClick={nextSlide}>
                <IoIosArrowForward />
            </button>

        </div>
    );
};

export default Hero;
