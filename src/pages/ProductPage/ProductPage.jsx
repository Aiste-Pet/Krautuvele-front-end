import classNames from 'classnames/bind';
import React from 'react';
import { useLocation } from 'react-router-dom';

import ProductImageCarousel from '../../components/ProductImageCarousel/ProductImageCarousel';
import ShopRating from '../../components/ShopRating/ShopRating';
import useFetch from '../../utils/useFetch';
import styles from './ProductPage.module.scss';

const cn = classNames.bind(styles);

const currency = '€';

const ProductPage = () => {
  const location = useLocation();
  const selection = decodeURIComponent(location.pathname).replace(
    '/product/',
    ''
  );

  const {
    data: product,
    error: product_error,
    loading: product_loading,
  } = useFetch(`${process.env.REACT_APP_API_URL}product/${selection}`);

  if (product_loading) return <p>Loading...</p>;
  if (product_error) return <p>Error: {product_error.message}</p>;
  return (
    <div className={cn('page-body')}>
      <div className={cn('page-body__left')}>
        <ProductImageCarousel product_images={product.product_images} />
      </div>
      <div className={cn('page-body__right')}>
        <div>{product.name}</div>
        <div>{product.description}</div>
        <div>
          {product.price} {currency}
        </div>
        <div>
          <ShopRating shop_id={product.shop_id} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
