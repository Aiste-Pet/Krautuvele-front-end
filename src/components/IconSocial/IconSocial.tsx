import classNames from 'classnames/bind';
import React from 'react';

import styles from './IconSocial.module.scss';

const cn = classNames.bind(styles);

type IconSocialProps = {
  link: string;
  alt: string;
  children: React.ReactNode;
}

export default function IconSocial({ link, alt, children }: IconSocialProps) {
  return (
    <a
      href={link}
      className={cn('link')}
      aria-label={alt}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}
