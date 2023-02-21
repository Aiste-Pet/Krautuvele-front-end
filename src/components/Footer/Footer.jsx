import classNames from 'classnames/bind';
import React from 'react';

import { ReactComponent as FacebookIcon } from '../../assets/Icon_facebook.svg';
import { ReactComponent as InstagramIcon } from '../../assets/Icon_instagram.svg';
import { ReactComponent as TwitterIcon } from '../../assets/Icon_twitter.svg';
import CategoriesList from '../CategoriesList/CategoriesList';
import IconSocial from '../IconSocial/IconSocial';
import styles from './Footer.module.scss';

const cn = classNames.bind(styles);

const SOCIALS = [
  {
    name: 'Facebook',
    link: 'https://www.facebook.com/',
    image: <FacebookIcon />,
    alt: 'Sourcery Facebook page',
  },
  {
    name: 'Twitter',
    link: 'https://twitter.com/',
    image: <TwitterIcon />,
    alt: 'Sourcery Twitter page',
  },
  {
    name: 'Instagram',
    link: 'https://www.instagram.com/',
    image: <InstagramIcon />,
    alt: 'Sourcery Instagram page',
  },
];

export default function Footer() {
  return (
    <footer className={cn('footer')}>
      <div className={cn('footer__text')}>
        <div>
          <div>Produktų kategorijos</div>
          <CategoriesList type="footer" />
        </div>
        <div>
          <div>Apie Mus</div>
          <ul className={cn('footer__list')}>
            <li>Susisiekime</li>
            <li>Apie Mus</li>
            <li>Karjera</li>
            <li>Spauda</li>
          </ul>
        </div>
        <div>
          <div>Taisyklės</div>
          <ul className={cn('footer__list')}>
            <li>Pirkimo taisyklės</li>
            <li>Mokėjimas</li>
            <li>Grąžinimas</li>
            <li>Siuntimas</li>
            <li>Duomenų apsauga</li>
          </ul>
        </div>
      </div>
      <div className={cn('footer__links')}>
        <div className={cn('footer__socials')}>
          {SOCIALS.map(({ name, link, image, alt }) => (
            <IconSocial
              key={name}
              link={link}
              alt={alt}
              className={cn('footer__svg')}
            >
              {image}
            </IconSocial>
          ))}
        </div>
        <div>© Krautuvele.lt 2023 Visos teisės saugomos</div>
      </div>
    </footer>
  );
}
