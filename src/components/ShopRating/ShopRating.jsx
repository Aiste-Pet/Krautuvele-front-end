import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import useFetch from '../../utils/useFetch';
import Slogan from '../Slogan/Slogan';
import styles from './ShopRating.module.scss';

const cn = classNames.bind(styles);

const Star = ({ selected = false }) => (
  <div
    style={{
      color: selected ? '#ff8c4b' : '#b6b6b6',
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

  if (shop_loading) return <p>Loading...</p>;
  if (shop_error) return <p>Error: {shop_error.message}</p>;

  return (
    <div className={cn('shop')}>
      <Link className={cn('shop__name')} to={`/shop/${shop.id}`}>
        <div className={cn('shop__name-link')}>{shop.name}</div>
      </Link>
      <Slogan slogan={shop.slogan} />
      <div className={cn('shop__location')}>{shop.city}</div>
      <div className={cn('shop__rating')}>
        <p className={cn('shop__number-rating')}>{shop.rating}</p>
        <div className={cn('shop__star-rating')}>
          {[...Array(5)].map((n, i) => (
            <Star key={i} selected={i + 1 < shop.rating} />
          ))}
        </div>
      </div>

      <div className={cn('shop__sold')}>Parduota prekių: {shop.items_sold}</div>
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
