import classNames from 'classnames/bind';
import React from 'react';
import { useLocation } from 'react-router-dom';

import ProductImageCarousel from '../../components/ProductImageCarousel/ProductImageCarousel';
import useFetch from '../../utils/useFetch';
import styles from './ProductPage.module.scss';

const cn = classNames.bind(styles);

const ProductPage = () => {
  const location = useLocation();
  const selection = decodeURIComponent(location.pathname).replace(
    '/product/',
    ''
  );

  const { data, error, loading } = useFetch(
    `${process.env.REACT_APP_API_URL}product/${selection}`
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className={cn('page-body')}>
      <div className={cn('page-body__left')}>
        <ProductImageCarousel product_images={data[0].product_images} />
      </div>
      <div className={cn('page-body__right')}>
        <div></div>
      </div>
    </div>
  );
};

export default ProductPage;
