import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import useFetch from '../../utils/useFetch';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductGallery.module.scss';

const cn = classNames.bind(styles);

const ProductGallery = ({ api_url }) => {
  const { data, error, loading } = useFetch(api_url);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className={cn('product-gallery')}>
      {data.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ProductGallery;

ProductGallery.propTypes = {
  api_url: PropTypes.string,
};
