import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import CookieConsent from 'react-cookie-consent';

import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import styles from './Layout.module.scss';

const cn = classNames.bind(styles);

const Layout = ({ children }) => {
  return (
    <div className={cn('layout-wrapper')}>
      <Navbar />
      <CookieConsent
        location="bottom"
        buttonText="Priimti"
        style={{ background: '#1b4b66', opacity: '0.9' }}
        buttonStyle={{
          color: '#13101e',
          background: '#deeced',
        }}
        expires={150}
      >
        Mes ir mūsų partneriai saugome ir/ar turime prieigą prie įrenginyje
        esančios informacijos, tokios kaip unikalūs identifikatoriai slapukuose,
        kad galėtume tvarkyti asmens duomenis.{' '}
      </CookieConsent>
      <div className={cn('layout-wrapper__contents-wrapper')}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
