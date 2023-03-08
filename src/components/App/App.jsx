import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CartPage from '../../pages/CartPage/CartPage';
import LandingPage from '../../pages/LandingPage/LandingPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import ProductListPage from '../../pages/ProductListPage/ProductListPage';
import ProductPage from '../../pages/ProductPage/ProductPage';
import ShopPage from '../../pages/ShopPage/ShopPage';
import UserProfilePage from '../../pages/UserProfilePage/UserProfilePage';
import Layout from '../Layout/Layout';

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
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
