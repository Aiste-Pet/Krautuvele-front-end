import React from 'react'

import styles from "./ShopCard.module.scss"

import classNames from 'classnames/bind';

const cn = classNames.bind(styles);


const ShopCard = ({item}) => {
    const image_dir = `https://shark-app-dcfyj.ondigitalocean.app/api/static/shop_logos/${item.logo_dir}`
    return (
        <div className={cn('shop')}>
            <div className={cn('shop__image')}>
                <img src={image_dir} alt="" />
            </div>
            <div className={cn('shop__text')}>
                    <div className={cn('shop__name')}>{item.name}</div>
            </div>
        </div>
    )
}

export default ShopCard