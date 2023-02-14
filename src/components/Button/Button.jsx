import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cn = classNames.bind(styles);

const Button = ({ children, to, type, onClick }) => {
  if (to === undefined) {
    return (
      <button
        className={cn('btn')}
        type={type ? type : 'button'}
        onClick={onClick}
      >
        {children}
      </button>
    );
  } else {
    return (
      <Link className={cn('btn')} to={to}>
        {children}
      </Link>
    );
  }
};

export default Button;

Button.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};
