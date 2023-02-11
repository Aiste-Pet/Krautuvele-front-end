import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from '../../pages/LandingPage/LandingPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import ProductListPage from '../../pages/ProductListPage/ProductListPage';
import Layout from '../Layout/Layout';

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/products/*" element={<ProductListPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
