import classNames from 'classnames/bind';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { getCookieConsentValue } from 'react-cookie-consent';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import ProductImageCarousel from '../../components/ProductImageCarousel/ProductImageCarousel';
import ShopRating from '../../components/ShopRating/ShopRating';
import Slider from '../../components/Slider/Slider';
import Tabs from '../../components/Tabs/Tabs';
import { useAuth } from '../../utils/useAuth';
import useFetch from '../../utils/useFetch';
import styles from './ProductPage.module.scss';

const cn = classNames.bind(styles);

const currency = '€';

const tab_content = [
  {
    title: 'Produkto informacija',
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente accusamus fugiat vero consectetur quis numquam id, amet explicabo nobis ad rerum, sed doloremque, atque cupiditate harum nam esse dignissimos ea.',
  },
  {
    title: 'Siuntimo informacija',
    children:
      'Vero lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente accusamus fugiat vero consectetur quis numquam id, amet explicabo nobis ad rerum, sed doloremque, atque cupiditate harum nam esse dignissimos ea.',
  },
  {
    title: 'Pirkimo informacija',
    children:
      'Quis vero lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente accusamus fugiat vero consectetur quis numquam id, amet explicabo nobis ad rerum, sed doloremque, atque cupiditate harum nam esse dignissimos ea.',
  },
];

const ProductPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const location = useLocation();
  const selection = decodeURIComponent(location.pathname).replace(
    '/product/',
    ''
  );

  const [cartItem, setCartItem] = useState({
    product_id: '',
    quantity: '',
  });

  const [logged] = useAuth();

  function handleCartButton() {
    setError('');
    setSuccess('');
    let cartId;
    const quantity = 1;
    if (!logged) {
      const cookieConsentValue = getCookieConsentValue();
      if (!cookieConsentValue) {
        setError(
          'Norint naudotis krepšeliu neprisijungus, būtina priimti slapukus.'
        );
        return;
      }
      setError('');
      cartId = Cookies.get('cartId');
      if (!cartId) {
        cartId = uuidv4();
        document.cookie = `cartId=${cartId}`;
      }
      const cart = JSON.parse(sessionStorage.getItem(`cart_${cartId}`) || '{}');
      cart[product.id] = (cart[product.id] || 0) + quantity;
      sessionStorage.setItem(`cart_${cartId}`, JSON.stringify(cart));
      setSuccess('Produktas sėkmingai pridėtas į krepšelį.');
    } else {
      setCartItem({
        product_id: product.id,
        quantity: quantity,
      });
      console.log(cartItem);
      createCartItem();
    }
  }

  const createCartItem = async () => {
    try {
      const authKey = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
      const { access_token } = JSON.parse(authKey);
      const response = await fetch(`${process.env.REACT_APP_API_URL}cart-add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(cartItem),
      });

      if (response.ok) {
        setSuccess('Produktas sėkmingai pridėtas į krepšelį.');
      } else {
        setError('Įvyko klaida:', response.statusText);
      }
    } catch (error) {
      setError('Įvyko klaida:', error);
    }
  };

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
            <div className={cn('product__errors')}>{error}</div>
            <div className={cn('product__success')}>{success}</div>
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
