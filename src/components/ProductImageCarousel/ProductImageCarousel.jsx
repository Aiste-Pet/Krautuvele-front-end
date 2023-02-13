import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Pagination, Zoom } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ReactComponent as ArrowLeft } from '../../assets/Icon_left.svg';
import { ReactComponent as ArrowRight } from '../../assets/Icon_right.svg';
import styles from './ProductImageCarousel.module.scss';

const cn = classNames.bind(styles);

const ProductImageCarousel = ({ product_images }) => {
  const [swiper, setSwiper] = useState(null);
  return (
    <div className={cn('slider-container')}>
      <div
        className={cn('arrow-next')}
        onClick={() => swiper && swiper.slideNext()}
      >
        <ArrowRight />
      </div>
      <div
        className={cn('arrow-prev')}
        onClick={() => swiper && swiper.slidePrev()}
      >
        <ArrowLeft />
      </div>
      <Swiper
        style={{
          '--swiper-pagination-color': '#6ea9ad',
          '--swiper-navigation-color': '#fff',
        }}
        zoom={true}
        pagination={{
          clickable: true,
        }}
        modules={[Zoom, Pagination]}
        navigation={{
          prevEl: '.arrow-prev',
          nextEl: '.arrow-next',
        }}
        loop={true}
        onSwiper={setSwiper}
        slidesPerView={1}
      >
        {product_images.map((image) => (
          <SwiperSlide key={image} className={cn('slide')}>
            <div className={cn('swiper-zoom-container')}>
              <img src={`${process.env.REACT_APP_API_URL}${image}`} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageCarousel;

ProductImageCarousel.propTypes = {
  product_images: PropTypes.array,
};
