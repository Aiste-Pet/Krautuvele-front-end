"use client"

import Slider from 'react-slick';

import styles from './Slider.module.scss'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
        {
            breakpoint: 1500,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className={styles.arrow_next} onClick={onClick}><div className={styles.arrow-next_top}></div>
        <div className={styles.arrow_next_bottom}></div>
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className={styles.arrow_prev} onClick={onClick}><div className={styles.arrow-prev_top}></div>
        <div className={styles.arrow_prev_bottom}></div>
        </div>
    );
}


export default function SliderC({ element }) {

    return (
        <div>
            <Slider {...settings}>
                {element}
            </Slider>
        </div>
    )
}