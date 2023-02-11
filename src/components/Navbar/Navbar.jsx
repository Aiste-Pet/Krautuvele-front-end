import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import React from 'react';
import styles from './Navbar.module.scss';
import CategoriesList from '../CategoriesList/CategoriesList';
import logo from '../../assets/krautuvele.png';
import { ReactComponent as SearchIcon } from '../../assets/Icon_search.svg';
import { ReactComponent as UserIcon } from '../../assets/Icon_user.svg';
import { ReactComponent as CartIcon } from '../../assets/Icon_cart.svg';

import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

export default function Navbar() {
  return (
    <nav className={cn('navigation')}>
      <div className={cn('navigation__top')}>
        <Link to="/">
          <div className={cn('logo')}>
            <img src={logo} alt="" />
          </div>
        </Link>
        <div className={cn('navigation__search')}>
          <SearchIcon className={cn('icon')} alt="icon" />
          <input
            className={cn('search__input')}
            type="text"
            placeholder="Ieškoti parduotuvių ar prekių..."
          />
        </div>
        <div className={cn('navigation__icons')}>
          <UserIcon className={cn('icon')} />
          <CartIcon className={cn('icon')} />
        </div>
      </div>
      <div className={cn('navigation__bottom')}>
        <Suspense fallback={<h1>Loading</h1>}>
          <CategoriesList />
        </Suspense>
      </div>
    </nav>
  );
}
