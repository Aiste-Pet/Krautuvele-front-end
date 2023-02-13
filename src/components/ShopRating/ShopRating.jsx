import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import useFetch from '../../utils/useFetch';
import styles from './ShopRating.module.scss';

const cn = classNames.bind(styles);

const Star = ({ selected = false }) => (
  <div
    style={{
      color: selected ? 'orange' : 'gray',
    }}
  >
    &#9733;
  </div>
);

const ShopRating = ({ shop_id }) => {
  const {
    data: shop,
    error: shop_error,
    loading: shop_loading,
  } = useFetch(`${process.env.REACT_APP_API_URL}shop/${shop_id}`);

  const [isStarHovered, setIsStarHovered] = useState(false);

  if (shop_loading) return <p>Loading...</p>;
  if (shop_error) return <p>Error: {shop_error.message}</p>;
  return (
    <div className={cn('shop')} onMouseLeave={() => setIsStarHovered(false)}>
      <div>{shop.name}</div>
      <div
        className={cn('shop__star-rating')}
        onMouseEnter={() => setIsStarHovered(true)}
      >
        {[...Array(5)].map((n, i) => (
          <Star key={i} selected={i + 1 < shop.rating} />
        ))}
      </div>
      <p
        className={cn('shop__rating', {
          'shop__rating--open': isStarHovered,
        })}
      >
        {shop.rating}
      </p>
      <div>Parduota prekių: {shop.items_sold}</div>
    </div>
  );
};

export default ShopRating;

ShopRating.propTypes = {
  shop_id: PropTypes.number,
};

Star.propTypes = {
  selected: PropTypes.bool,
};
