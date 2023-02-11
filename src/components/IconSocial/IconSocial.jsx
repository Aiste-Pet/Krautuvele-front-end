import styles from './IconSocial.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

const cn = classNames.bind(styles);

export default function IconSocial({ link, alt, children }) {
  return (
    <a href={link} className={cn('link')} aria-label={alt} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

IconSocial.propTypes = {
  link: PropTypes.string,
  children: PropTypes.node,
  alt: PropTypes.string
};
