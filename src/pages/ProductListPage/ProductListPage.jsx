import classNames from 'classnames/bind';
import React from 'react';
import { useLocation } from 'react-router-dom';

import Heading from '../../components/Heading/Heading';
import ListFetcher from '../../components/ListFetcher/ListFetcher';
import styles from './ProductListPage.module.scss';

const cn = classNames.bind(styles);

const ProductListPage = () => {
  const location = useLocation();
  const selection = decodeURIComponent(location.pathname).replace(
    '/products/',
    ''
  );
  const api_link = `${process.env.REACT_APP_API_URL}products/category/${selection}`;
  console.log(api_link);
  return (
    <div className={cn('page-body')}>
      <Heading text={selection} />
      <ListFetcher api_url={api_link} />
    </div>
  );
};

export default ProductListPage;
