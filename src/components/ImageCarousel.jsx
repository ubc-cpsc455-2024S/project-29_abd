import React, { useState, useEffect } from 'react';
import './ImageCarousel.css';

const images = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    'image4.jpg',
];


//below componenet is used from Chat GBT and modified to images every 5 seconds
const ImageCarousel = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="image-carousel">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`image-slide ${index === currentImageIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${image})` }}
                ></div>
            ))}
        </div>
    );
};

export default ImageCarousel;
