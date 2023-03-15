import classNames from 'classnames/bind';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cn = classNames.bind(styles);

type ButtonProps = {
  children: React.ReactNode;
  to?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  class?: 'celled' | 'secondary';
}

const Button = ({ children, to, type = 'button', onClick, class: buttonClass }: ButtonProps) => {
  if (buttonClass === 'celled') {
    return (
      <button
        className={cn('btn--celled')}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    );
  } else if (buttonClass === 'secondary') {
    return (
      <button
        className={cn('btn', { 'btn--secondary': true })}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    );
  } else if (to === undefined) {
    return (
      <button
        className={cn('btn', { 'btn--secondary': buttonClass === 'secondary' })}
        type={type}
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