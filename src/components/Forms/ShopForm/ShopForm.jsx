import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Button from '../../Button/Button';
import TextField from '../../FormComponents/TextField/TextField';
import styles from './ShopForm.module.scss';

const cn = classNames.bind(styles);

const ShopForm = ({
  setIsAdd,
  setNewShops,
  newShops,
  setErrorMessage,
  setSuccessMessage,
}) => {
  const [errors, setErrors] = useState({});
  const [shop, setShop] = useState({
    name: '',
    description: '',
    slogan: '',
    city: '',
    payment_account: '',
  });

  const validateShopData = () => {
    const validationErrors = {};

    if (!shop.name) {
      validationErrors.name = 'Pavadinimas yra privalomas';
    }
    if (!shop.description) {
      validationErrors.description = 'Aprašymas yra privalomas';
    }
    if (!shop.slogan) {
      validationErrors.slogan = 'Šūkis yra privalomas';
    }
    if (!shop.city) {
      validationErrors.city = 'Miestas yra privalomas';
    }
    if (!shop.payment_account) {
      validationErrors.payment_account = 'Išmokėjimo sąskaita yra privaloma';
    }
    return validationErrors;
  };

  const createShop = async () => {
    try {
      const authKey = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
      const { accessToken } = JSON.parse(authKey);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}create-shop`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(shop),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const shopId = data.id;
        setSuccessMessage('Duomenys atnaujinti sėkmingai');
        setNewShops([...newShops, { ...shop, id: shopId }]);
        setIsAdd(false);
      } else {
        setErrorMessage('Įvyko klaida:', response.statusText);
      }
    } catch (error) {
      setErrorMessage('Įvyko klaida:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = validateShopData();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    createShop();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsAdd(false);
    setErrorMessage('');
  };

  const handleNameChange = React.useCallback((event) => {
    const name = event.target.value;
    setShop((prevState) => ({
      ...prevState,
      name: name,
    }));
  }, []);
  const handleDescriptionChange = React.useCallback((event) => {
    const description = event.target.value;
    setShop((prevState) => ({
      ...prevState,
      description: description,
    }));
  }, []);
  const handleSloganChange = React.useCallback((event) => {
    const slogan = event.target.value;
    setShop((prevState) => ({
      ...prevState,
      slogan: slogan,
    }));
  }, []);
  const handleCityChange = React.useCallback((event) => {
    const city = event.target.value;
    setShop((prevState) => ({
      ...prevState,
      city: city,
    }));
  }, []);
  const handlePaymentAccountChange = React.useCallback((event) => {
    const payment_account = event.target.value;
    setShop((prevState) => ({
      ...prevState,
      payment_account: payment_account,
    }));
  }, []);

  return (
    <div>
      <form action="">
        {errors.general && <div className={cn('errors')}>{errors.general}</div>}
        <TextField
          name="name"
          value={shop.name}
          label="Pavadinimas"
          onChange={handleNameChange}
          required
        />
        {errors.name && <div className={cn('errors')}>{errors.name}</div>}
        <TextField
          name="description"
          value={shop.description}
          label="Aprašymas"
          onChange={handleDescriptionChange}
          required
        />
        {errors.description && (
          <div className={cn('errors')}>{errors.description}</div>
        )}
        <TextField
          name="slogan"
          value={shop.slogan}
          label="Šūkis"
          onChange={handleSloganChange}
          required
        />
        {errors.slogan && <div className={cn('errors')}>{errors.slogan}</div>}
        <TextField
          name="city"
          value={shop.city}
          label="Miestas"
          onChange={handleCityChange}
          required
        />
        {errors.city && <div className={cn('errors')}>{errors.city}</div>}
        <TextField
          name="payment_account"
          value={shop.payment_account}
          label="Apmokėjimo sąskaita"
          onChange={handlePaymentAccountChange}
          required
        />
        {errors.payment_account && (
          <div className={cn('errors')}>{errors.payment_account}</div>
        )}
        <div className={cn('buttons')}>
          <Button type="submit" onClick={handleSubmit}>
            Išsaugoti
          </Button>
          <Button onClick={handleCancel} class="secondary">
            Atšaukti
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ShopForm;

ShopForm.propTypes = {
  setIsAdd: PropTypes.func,
  setNewShops: PropTypes.func,
  setErrorMessage: PropTypes.func,
  setSuccessMessage: PropTypes.func,
  newShops: PropTypes.array,
};
