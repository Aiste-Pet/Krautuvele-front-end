import React from 'react';
import styles from './ProductListPage.module.scss';
import Heading from '../../components/Heading/Heading';
import ListFetcher from '../../components/ListFetcher/ListFetcher';
import { useLocation } from 'react-router-dom';

import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const ProductListPage = () => {
  const location = useLocation();
  const selection = decodeURIComponent(location.pathname).replace('/products/', '');
  const api_link = `https://shark-app-dcfyj.ondigitalocean.app/api/products/category/${selection}`;
  console.log(api_link);
  return (
    <div className={cn('page-body')}>
      <article>
        <Heading text="Naujienos" />
        <ListFetcher api_url={api_link} slider="true" />
      </article>
    </div>
  );
};

export default ProductListPage;
