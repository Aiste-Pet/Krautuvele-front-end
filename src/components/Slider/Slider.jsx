import Slider from 'react-slick';

import styles from './Slider.module.scss'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import classNames from 'classnames/bind';

import {ReactComponent as SliderLeft} from '../../assets/Icon_left.svg'
import {ReactComponent as SliderRight} from '../../assets/Icon_right.svg'

const cn = classNames.bind(styles);

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
    const {onClick } = props;
    return (
        <div className={cn('arrow-next')} onClick={onClick}>
            <SliderRight />
        </div>
    );
}

function SamplePrevArrow(props) {
    const {onClick } = props;
    return (
        <div className={cn('arrow-prev')}  onClick={onClick}>
            <SliderLeft />
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