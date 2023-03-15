import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Button from '../../Button/Button';
import TextField from '../../FormComponents/TextField/TextField';
import styles from './AddressForm.module.scss';

const cn = classNames.bind(styles);

const AddressForm = ({
  setIsAdd,
  setNewAddresses,
  newAddresses,
  setErrorMessage,
  setSuccessMessage,
}) => {
  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState({
    address_line: '',
    city: '',
    postal_code: '',
    country: '',
  });

  const validateAddressData = () => {
    const postal_code_regex = /((LT)[-])?(\d{5})/;
    const validationErrors = {};

    if (!address.address_line) {
      validationErrors.address_line = 'Adresas yra privalomas';
    }

    if (!address.city) {
      validationErrors.city = 'Miestas yra privalomas';
    }
    if (!address.postal_code) {
      validationErrors.postal_code = 'Pašto kodas yra privalomas';
    } else if (!postal_code_regex.test(address.postal_code)) {
      validationErrors.postal_code = 'Pašto kodo formatas yra neteisingas';
    }
    if (!address.country) {
      validationErrors.country = 'Šalis yra privaloma';
    }

    return validationErrors;
  };

  const createAddress = async () => {
    try {
      const authKey = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
      const { access_token } = JSON.parse(authKey);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}create-address`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(address),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const addressId = data.id;
        setSuccessMessage('Duomenys atnaujinti sėkmingai');
        setNewAddresses([...newAddresses, { ...address, id: addressId }]);
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
    let validationErrors = validateAddressData();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    createAddress();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsAdd(false);
    setErrorMessage('');
  };

  const handleAddressLineChange = React.useCallback((event) => {
    const addressLine = event.target.value;
    setAddress((prevState) => ({
      ...prevState,
      address_line: addressLine,
    }));
  }, []);
  const handleCityChange = React.useCallback((event) => {
    const city = event.target.value;
    setAddress((prevState) => ({
      ...prevState,
      city: city,
    }));
  }, []);
  const handlePostalCodeChange = React.useCallback((event) => {
    const postalCode = event.target.value;
    setAddress((prevState) => ({
      ...prevState,
      postal_code: postalCode,
    }));
  }, []);
  const handleCountryChange = React.useCallback((event) => {
    const country = event.target.value;
    setAddress((prevState) => ({
      ...prevState,
      country: country,
    }));
  }, []);

  return (
    <div>
      <form action="">
        {errors.general && <div className={cn('errors')}>{errors.general}</div>}
        <TextField
          name="address_line"
          value={address.address_line}
          label="Adresas"
          onChange={handleAddressLineChange}
          required
        />
        {errors.addressLine && (
          <div className={cn('errors')}>{errors.addressLine}</div>
        )}
        <TextField
          name="city"
          value={address.city}
          label="Miestas"
          onChange={handleCityChange}
          required
        />
        {errors.city && <div className={cn('errors')}>{errors.city}</div>}
        <TextField
          name="postal_code"
          value={address.postal_code}
          label="Pašto kodas"
          onChange={handlePostalCodeChange}
          required
        />
        {errors.postal_code && (
          <div className={cn('errors')}>{errors.postal_code}</div>
        )}
        <TextField
          name="country"
          value={address.country}
          label="Šalis"
          onChange={handleCountryChange}
          required
        />
        {errors.country && <div className={cn('errors')}>{errors.country}</div>}
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

export default AddressForm;

AddressForm.propTypes = {
  setIsAdd: PropTypes.func,
  setNewAddresses: PropTypes.func,
  setErrorMessage: PropTypes.func,
  setSuccessMessage: PropTypes.func,
  newAddresses: PropTypes.array,
};
