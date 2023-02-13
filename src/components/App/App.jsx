import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from '../../pages/LandingPage/LandingPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import ProductListPage from '../../pages/ProductListPage/ProductListPage';
import ProductPage from '../../pages/ProductPage/ProductPage';
import ShopPage from '../../pages/ShopPage/ShopPage';
import Layout from '../Layout/Layout';

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products/*" element={<ProductListPage />} />
            <Route path="/product/*" element={<ProductPage />} />
            <Route path="/shop/*" element={<ShopPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
