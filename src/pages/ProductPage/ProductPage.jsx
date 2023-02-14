import classNames from 'classnames/bind';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import ProductImageCarousel from '../../components/ProductImageCarousel/ProductImageCarousel';
import ShopRating from '../../components/ShopRating/ShopRating';
import Slider from '../../components/Slider/Slider';
import Tabs from '../../components/Tabs/Tabs';
import useFetch from '../../utils/useFetch';
import styles from './ProductPage.module.scss';

const cn = classNames.bind(styles);

const currency = '€';

const tab_content = [
  {
    title: 'Produkto informacija',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente accusamus fugiat vero consectetur quis numquam id, amet explicabo nobis ad rerum, sed doloremque, atque cupiditate harum nam esse dignissimos ea.',
  },
  {
    title: 'Siuntimo informacija',
    text: 'Vero lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente accusamus fugiat vero consectetur quis numquam id, amet explicabo nobis ad rerum, sed doloremque, atque cupiditate harum nam esse dignissimos ea.',
  },
  {
    title: 'Pirkimo informacija',
    text: 'Quis vero lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente accusamus fugiat vero consectetur quis numquam id, amet explicabo nobis ad rerum, sed doloremque, atque cupiditate harum nam esse dignissimos ea.',
  },
];

function handleCartButton() {
  console.log('cart button clicked');
}

const ProductPage = () => {
  const location = useLocation();
  const selection = decodeURIComponent(location.pathname).replace(
    '/product/',
    ''
  );

  const {
    data: product,
    error: product_error,
    loading: product_loading,
  } = useFetch(`${process.env.REACT_APP_API_URL}product/${selection}`);

  if (product_loading) return <p>Loading...</p>;
  if (product_error) return <p>Error: {product_error.message}</p>;

  let api_link = '';

  if (!product_loading) {
    api_link = `${process.env.REACT_APP_API_URL}shop-products/${product.shop_id}`;
  }

  return (
    <div>
      <div className={cn('page-body__top')}>
        <div className={cn('page-body__left')}>
          <ProductImageCarousel product_images={product.product_images} />
        </div>
        <div className={cn('page-body__right')}>
          <div className={cn('shop')}>
            <ShopRating shop_id={product.shop_id} />
          </div>
          <div className={cn('product')}>
            <div className={cn('product__name')}>{product.name}</div>
            <div className={cn('product__description')}>
              {product.description}
            </div>
            <div className={cn('product__price')}>
              {product.price} {currency}
            </div>
            <div className={cn('product__button')}>
              <Button onClick={handleCartButton}>Įdėti į krepšelį</Button>
            </div>
          </div>
        </div>
      </div>
      <div className={cn('page-body__bottom')}>
        <div>
          <Tabs tab_content={tab_content} />
        </div>
      </div>
      <article>
        <div className={cn('page-body__headers')}>
          <Heading text="Kitos šios parduotuvės prekės" />
          <Link
            className={cn('page-body__link')}
            to={`/shop/${product.shop_id}`}
          >
            Žiūrėti visas
          </Link>
        </div>
        <Slider api_url={api_link} type="product" />
      </article>
    </div>
  );
};

export default ProductPage;
