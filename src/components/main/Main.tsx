import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import 'antd/dist/reset.css';
import MakeUpImg1 from './assets/make-up1.jpg';
import MakeUpImg2 from './assets/makeup2.webp';
import MakeUpImg3 from './assets/makeup3.jpg';
import MakeUpImg4 from './assets/makeup4.jpg';
import MakeUpImg5 from './assets/loreal.png';
import './Main.scss';

const Main = () => {
    const imageList = [
        MakeUpImg1,
        MakeUpImg2,
        MakeUpImg3,
        MakeUpImg4,
        MakeUpImg5
    ];

    const [images] = useState<string[]>(imageList);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;

        if (isModalOpen) {
            timer = setInterval(() => {
                handleNext();
            }, 2000);
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [isModalOpen, currentIndex]);

    const handleRectangleClick = (index: number) => {
        setCurrentImage(imageList[index]);
        setCurrentIndex(index);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleNext = () => {
        if (currentIndex !== null && currentIndex < imageList.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setCurrentImage(imageList[nextIndex]);
        } else if (currentIndex !== null && currentIndex === imageList.length - 1) {
            setCurrentIndex(0);
            setCurrentImage(imageList[0]);
        }
    };

    const handlePrev = () => {
        if (currentIndex !== null && currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            setCurrentIndex(prevIndex);
            setCurrentImage(imageList[prevIndex]);
        }
    };

    const brandNames = [
        "Dikson",
        "Plisson",
        "Guy Laroche",
        "Pureality",
        "L'Oreal"
    ];

    return (
        <div className="container rectangle__container__items">
            <div className="rectangle__container">
                {imageList.map((img, index) => (
                    <div className='rectangle__main' key={index}>
                        <div
                            className="rectangle__main__rectangle"
                            onClick={() => handleRectangleClick(index)}
                        >
                            <img src={images[index]} alt={`Story ${index}`} />
                        </div>
                        <p className='rectangle__main__title'>{brandNames[index]}</p>
                    </div>
                ))}
            </div>

            <Modal
                open={isModalOpen}
                onCancel={handleModalClose}
                footer={null}
                centered
                width={354}
                bodyStyle={{ width: '330px', maxHeight: '580px', height: '493px' }}
            >
                {currentImage && (
                    <div style={{ position: 'relative' }}>
                        <img src={currentImage} alt="Selected" style={{ width: '100%', height: '560px', maxHeight: '560px' }} />
                        <button onClick={handlePrev} className="arrow left-arrow">{'<'}</button>
                        <button onClick={handleNext} className="arrow right-arrow">{'>'}</button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Main;
