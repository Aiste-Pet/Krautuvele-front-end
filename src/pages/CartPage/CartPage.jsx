import classNames from 'classnames/bind';
import Cookies from 'js-cookie';
import React from 'react';

import Heading from '../../components/Heading/Heading';
import useAuthFetch from '../../utils/useAuthFetch';
import styles from './CartPage.module.scss';

const cn = classNames.bind(styles);

const currency = '€';

const CartPage = () => {
  const logged = isLogged();

  function isLogged() {
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'));
    return token ? true : false;
  }
  let cartItems = [];
  if (logged) {
    const { data, error, loading } = useAuthFetch(
      `${process.env.REACT_APP_API_URL}cart`
    );

    if (loading) return <p>Loading...</p>;

    if (error) {
      if (error.message === '404') {
        return <p>Jūsų krepšelis tuščias</p>;
      } else return <p>Error: {error.message}</p>;
    }

    cartItems = data;
  } else {
    const cartId = Cookies.get('cartId');
    if (cartId) {
      const cart = JSON.parse(sessionStorage.getItem(`cart_${cartId}`));
      if (cart) {
        cartItems = cart.cart_items;
      }
    }
  }

  const total = cartItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );
  return (
    <div className={cn('login-page')}>
      {' '}
      <Heading text="Krepšelis" />
      {cartItems.length === 0 ? (
        <p>Jūsų krepšelis tuščias</p>
      ) : (
        <>
          <div className={cn('table-wrapper')}>
            <table className={cn('table-wrapper__fl-table')}>
              <thead>
                <tr>
                  <th>Pavadinimas</th>
                  <th>Kiekis</th>
                  <th>Kaina</th>
                  <th>Viso</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>
                      {currency}
                      {item.product_price}
                    </td>
                    <td>
                      {currency}
                      {(item.product_price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" style={{ textAlign: 'right' }}>
                    <h3>Total:</h3>
                  </td>
                  <td>
                    <h3>
                      {currency}
                      {total.toFixed(2)}
                    </h3>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
