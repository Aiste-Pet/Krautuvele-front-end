import React from 'react';

import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

import styles from './Layout.module.scss';

const cn = classNames.bind(styles);

const Layout = ({ children }) => {
  return (
    <div className={cn('layout-wrapper')}>
      <Navbar />
      <div className={cn('layout-wrapper__contents-wrapper')}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
