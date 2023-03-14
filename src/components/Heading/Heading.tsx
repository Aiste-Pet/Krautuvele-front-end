import classNames from 'classnames/bind';
import React from 'react';

import styles from './Heading.module.scss';

const cn = classNames.bind(styles);

type HeadingProps = {
  text: string;
  type: string;
}

const Heading = ({ text, type }: HeadingProps) => {
  if (type === 'light') {
    return <h1 className={cn('heading-light')}>{text}</h1>;
  } else {
    return <h1 className={cn('heading-dark')}>{text}</h1>;
  }
};

export default Heading;