import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './HamburgerIcon.module.scss';

const cn = classNames.bind(styles);
const burgerBars = 3;

const HamburgerIcon = ({ open, setOpen }) => {
  return (
    <button
      className={cn('burger')}
      onClick={() => {
        setOpen(!open);
      }}
      tabIndex="0"
    >
      {Array.from({ length: burgerBars }).map((_, index) => (
        <div
          key={index}
          className={cn('burger__bar', { 'burger__bar--open': open })}
        />
      ))}
    </button>
  );
};

export default HamburgerIcon;

HamburgerIcon.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setIsDropdownOpen: PropTypes.func,
};
