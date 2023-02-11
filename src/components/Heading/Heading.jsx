import React from 'react';
import styles from './Heading.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cn = classNames.bind(styles);

const Heading = ({ text, type }) => {
  if (type === 'light') {
    return <h1 className={cn('header-light')}>{text}</h1>;
  } else {
    return <h1 className={cn('header-dark')}>{text}</h1>;
  }
};

export default Heading;

Heading.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string
};
