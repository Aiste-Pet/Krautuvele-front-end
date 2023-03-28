import classNames from 'classnames/bind';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import isLogged from '../../../utils/isLogged';
import Button from '../../Button/Button';
import TextField from '../../FormComponents/TextField/TextField';
import Heading from '../../Heading/Heading';
import styles from './LoginForm.module.scss';

const cn = classNames.bind(styles);

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const logged = isLogged();

  const onSubmitClick = (e) => {
    e.preventDefault();
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const validationErrors = {};
    if (!email) {
      validationErrors.email = 'El. pašto adresas yra privalomas';
    } else if (!email_regex.test(email)) {
      validationErrors.email = 'El. pašto formatas yra neteisingas';
    }
    if (!password) {
      validationErrors.password = 'Slaptažodis yra privalomas';
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    let opts = {
      email: email,
      password: password,
    };
    fetch(`${import.meta.env.VITE_API_URL}login`, {
      method: 'post',
      body: JSON.stringify(opts),
    })
      .then((r) => r.json())
      .then((token) => {
        if (token.access_token) {
          localStorage.setItem(
            'REACT_TOKEN_AUTH_KEY',
            JSON.stringify({ accessToken: token.access_token })
          );
          navigate('/profile');
          gatherCartItems();
        } else {
          setErrors({ general: 'Įveskite teisingus el. paštą ir slaptažodį' });
        }
      });
  };

  const gatherCartItems = () => {
    const cartId = Cookies.get('cartId');
    if (cartId) {
      const cart = JSON.parse(sessionStorage.getItem(`cart_${cartId}`) || '{}');
      const cartItems = cart.cart_items;
      if (cartItems) {
        createCartItems(cartItems);
        sessionStorage.removeItem(`cart_${cartId}`);
      }
    }
  };

  const createCartItems = async (cartItems) => {
    try {
      const authKey = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
      const { accessToken } = JSON.parse(authKey);
      const response = await fetch(`${import.meta.env.VITE_API_URL}cart-add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(cartItems),
      });

      if (response.ok) {
        console.log('cart updated');
      } else {
        console.log('Įvyko klaida:', response.statusText);
      }
    } catch (error) {
      console.log('Įvyko klaida:', error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prevErrors) => {
      const { ...otherErrors } = prevErrors;
      return otherErrors;
    });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => {
      const { ...otherErrors } = prevErrors;
      return otherErrors;
    });
  };

  useEffect(() => {
    if (logged) {
      navigate('/');
    }
  }, [logged, navigate]);
  return (
    <div>
      <Heading text="Prisijungti prie paskyros" />
      <form action="#">
        {errors.general && <div className={cn('errors')}>{errors.general}</div>}
        <TextField
          name="email"
          value={email}
          label="El. paštas"
          placeholder="vardenis@email.com"
          onChange={handleEmailChange}
          autoComplete="given-name"
          required
        />
        {errors.email && <div className={cn('errors')}>{errors.email}</div>}
        <TextField
          name="password"
          value={password}
          type="password"
          label="Slaptažodis"
          placeholder="**********"
          onChange={handlePasswordChange}
          required
        />
        {errors.password && (
          <div className={cn('errors')}>{errors.password}</div>
        )}
        <Button onClick={onSubmitClick} type="submit">
          Prisijungti
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
