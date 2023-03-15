import classNames from 'classnames/bind';
import { Suspense } from 'react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as CartIcon } from '../../assets/Icon_cart.svg';
import { ReactComponent as SearchIcon } from '../../assets/Icon_search.svg';
import { ReactComponent as UserIcon } from '../../assets/Icon_user.svg';
import logo from '../../assets/krautuvele.png';
import { useAuth } from '../../utils/useAuth';
import CategoriesList from '../CategoriesList/CategoriesList';
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon';
import MobileNav from '../MobileNav/MobileNav';
import styles from './Navbar.module.scss';

const cn = classNames.bind(styles);

const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const handleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileNavOpen(false);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  const [logged] = useAuth();
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
          {logged ? (
            <Link to={`/profile`}>
              <UserIcon className={cn('icon')} />
            </Link>
          ) : (
            <Link to={`/login`}>
              <UserIcon className={cn('icon')} />
            </Link>
          )}
          <Link to={`/cart`}>
            <CartIcon className={cn('icon')} />
          </Link>
          <HamburgerIcon
            open={isMobileNavOpen}
            setOpen={setIsMobileNavOpen}
            onClick={handleMobileNav}
          />
        </div>
      </div>
      <div className={cn('navigation__bottom')}>
        <Suspense fallback={<h1>Loading</h1>}>
          <CategoriesList />
        </Suspense>
      </div>
      <MobileNav
        isMobileNavOpen={isMobileNavOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
      />
    </nav>
  );
};

export default Navbar;
