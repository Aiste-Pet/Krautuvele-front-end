import React, { Fragment } from 'react';
import Normalize from 'react-normalize';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from '../../pages/LandingPage/LandingPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import Layout from '../Layout/Layout';

const App = () => {
  return (
    <Fragment>
      <Normalize />
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    </Fragment>
  );
};

export default App;
