import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ProductCard.module.scss';

const cn = classNames.bind(styles);

const currency = '€';

const ProductCard = ({ item }) => {
  const image_dir = `${import.meta.env.VITE_API_URL}${item.product_images[0]}`;
  return (
    <div className={cn('product')}>
      <Link className={cn('product__link')} to={`/product/${item.id}`}>
        <div className={cn('product__image')}>
          <img src={image_dir} alt="" />
        </div>
        <div className={cn('product__text')}>
          <div className={cn('product__name')}>{item.name}</div>
          <div className={cn('product__price')}>
            <strong>
              {item.price} {currency}
            </strong>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  item: PropTypes.object,
};
