import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ReactComponent as ArrowLeft } from '../../assets/Icon_left.svg';
import { ReactComponent as ArrowRight } from '../../assets/Icon_right.svg';
import useFetch from '../../utils/useFetch';
import ProductCard from '../ProductCard/ProductCard';
import ShopCard from '../ShopCard/ShopCard';
import styles from './Slider.module.scss';

const cn = classNames.bind(styles);

const Slider = ({ api_url, type }) => {
  const { data, error, loading } = useFetch(api_url);
  const [swiper, setSwiper] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (type === 'product') {
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
          navigation={{
            prevEl: '.arrow-prev',
            nextEl: '.arrow-next',
          }}
          loop={true}
          onSwiper={setSwiper}
          breakpoints={{
            300: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <ProductCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  if (type === 'shop') {
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
          navigation={{
            prevEl: '.arrow-prev',
            nextEl: '.arrow-next',
          }}
          slidesPerView={1}
          loop={true}
          onSwiper={setSwiper}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            855: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1265: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
            1480: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <ShopCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
};

export default Slider;

Slider.propTypes = {
  api_url: PropTypes.string,
  type: PropTypes.string,
};
