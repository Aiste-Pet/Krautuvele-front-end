import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from "./Navbar.module.scss"
import CategoriesList from "../CategoriesList/CategoriesList"
import logo from '../../../public/assets/krautuvele.png'
import SearchIcon from '../../../public/assets/Icon_search.svg'
import UserIcon from '../../../public/assets/Icon_user.svg'
import CartIcon from '../../../public/assets/Icon_cart.svg'

import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

export default function Navbar() {
    return (
        <nav className={cn('navigation')}>
            <div className={cn('navigation__top')}>
                <NavLink href="/">
                    <div className={cn('logo')}>
                        <img src={logo} alt="" />
                    </div>
                </NavLink>
                <div className={cn('navigation__search')}>
                    <div className={cn('icon')}>
                        <SearchIcon />
                    </div>
                    <input className={cn('search__input')} type="text" placeholder="Ieškoti parduotuvių ar prekių..." />
                </div>
                <div className={cn('navigation__icons')}>
                    <div className={cn('icon')}>
                        <UserIcon />
                    </div>
                    <div className={cn('icon')}>
                       <CartIcon />
                    </div> 
                </div>
            </div>
            <div className={cn('navigation__bottom')}>
                {/* <CategoriesList /> */}
            </div>
        </nav>
    )
}