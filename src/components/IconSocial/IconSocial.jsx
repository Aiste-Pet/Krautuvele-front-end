import styles from './IconSocial.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

export default function IconSocial({ link, alt, children }) {
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
};