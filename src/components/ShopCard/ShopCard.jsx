import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ShopCard.module.scss';

const cn = classNames.bind(styles);

const ShopCard = ({ item }) => {
  const image_dir = `${process.env.REACT_APP_API_URL}static/shop_logos/${item.logo_dir}`;
  return (
    <div className={cn('shop')}>
      <Link className={cn('shop__name')} to={`/shop/${item.id}`}>
        <div className={cn('shop__image')}>
          <img src={image_dir} alt="" />
        </div>
        <div className={cn('shop__text')}>
          <div className={cn('shop__name')}>{item.name}</div>
        </div>
      </Link>
    </div>
  );
};

export default ShopCard;

ShopCard.propTypes = {
  item: PropTypes.object,
};
