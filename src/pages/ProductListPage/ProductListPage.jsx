import React from 'react';
import { useLocation } from 'react-router-dom';

import Heading from '../../components/Heading/Heading';
import ProductGallery from '../../components/ProductGallery/ProductGallery';

const ProductListPage = () => {
  const location = useLocation();
  const selection = decodeURIComponent(location.pathname).replace(
    '/products/',
    ''
  );
  const api_link = `${process.env.REACT_APP_API_URL}products/category/${selection}`;
  return (
    <div>
      <Heading text={selection} />
      <div>
        <ProductGallery api_url={api_link} />
      </div>
    </div>
  );
};

export default ProductListPage;
