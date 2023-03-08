import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import CategoriesList from '../CategoriesList/CategoriesList';
import styles from './MobileNav.module.scss';

const cn = classNames.bind(styles);

const MobileNav = ({ isMobileNavOpen, setIsMobileNavOpen }) => {
  const handleEscape = (event) => {
    if (event.key === 'Escape') {
      setIsMobileNavOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <ul className={cn('mobile-nav', { 'mobile-nav--open': isMobileNavOpen })}>
      <CategoriesList type="mobile" />
    </ul>
  );
};

export default MobileNav;

MobileNav.propTypes = {
  isMobileNavOpen: PropTypes.bool,
  setIsMobileNavOpen: PropTypes.func,
};
