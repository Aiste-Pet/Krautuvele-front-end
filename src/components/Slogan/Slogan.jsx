import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import styles from './Slogan.module.scss';

const cn = classNames.bind(styles);

const Slogan = ({ slogan }) => {
  const [isInView, setIsInView] = useState(false);

  const listRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(listRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <p
      ref={listRef}
      className={cn('slogan', {
        'slogan--animate': isInView,
      })}
    >
      {slogan}
    </p>
  );
};

Slogan.propTypes = {
  slogan: PropTypes.string,
};

export default Slogan;
