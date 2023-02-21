import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Button from '../../Button/Button';
import TextField from '../../FormComponents/TextField/TextField';
import styles from './UserForm.module.scss';

const cn = classNames.bind(styles);

const UserForm = ({ user }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [newUserData, setNewUserData] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone: user.phone,
  });

  const [userData, setUserData] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone: user.phone,
  });

  const handleEditClick = () => {
    setIsEdit(true);
  };

  const validateUserData = () => {
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phone_regex = /(86|\+3706)\d{3}\d{4}/;
    const validationErrors = {};

    if (!newUserData.firstName) {
      validationErrors.firstName = 'Vardas yra privalomas';
    }

    if (!newUserData.lastName) {
      validationErrors.lastName = 'Pavardė yra privaloma';
    }
    if (!newUserData.email) {
      validationErrors.email = 'El. pašto adresas yra privalomas';
    } else if (!email_regex.test(newUserData.email)) {
      validationErrors.email = 'El. pašto formatas yra neteisingas';
    }
    if (!newUserData.phone) {
      validationErrors.phone = 'Telefonas yra privalomas';
    } else if (!phone_regex.test(newUserData.phone)) {
      validationErrors.phone = 'Telefono numerio formatas yra neteisingas';
    }
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = validateUserData();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    updateUserData();
    setIsEdit(false);
  };

  const updateUserData = async () => {
    try {
      const authKey = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
      const { access_token } = JSON.parse(authKey);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}user-data`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(newUserData),
        }
      );

      if (response.ok) {
        setSuccessMessage('Duomenys atnaujinti sėkmingai');
        setUserData(newUserData);
      } else {
        if (response.status === 401) {
          setErrorMessage(
            'Sesijos laikas pasibaigė, prašome prisijungti iš naujo'
          );
        } else {
          setErrorMessage('Įvyko klaida:', response.statusText);
        }
      }
    } catch (error) {
      setErrorMessage('Įvyko klaida:', error);
    }
  };

  const handleFirstNameChange = React.useCallback((event) => {
    const newFirstName = event.target.value;
    setNewUserData((prevState) => ({
      ...prevState,
      firstName: newFirstName,
    }));
  }, []);

  const handleLastNameChange = React.useCallback((event) => {
    const newLastName = event.target.value;
    setNewUserData((prevState) => ({
      ...prevState,
      lastName: newLastName,
    }));
  }, []);

  const handleEmailChange = React.useCallback((event) => {
    const newEmail = event.target.value;
    setNewUserData((prevState) => ({
      ...prevState,
      email: newEmail,
    }));
  }, []);

  const handlePhoneChange = React.useCallback((event) => {
    const newPhone = event.target.value;
    setNewUserData((prevState) => ({
      ...prevState,
      phone: newPhone,
    }));
  }, []);

  return (
    <div>
      {errorMessage && <div className={cn('errors')}>{errorMessage}</div>}
      {successMessage && <div className={cn('success')}>{successMessage}</div>}
      {!isEdit && (
        <form action="">
          <TextField
            name="first_name"
            value={userData.firstName}
            label="Vardas"
            required
            disabled={true}
          />
          <TextField
            name="last_name"
            value={userData.lastName}
            label="Pavardė"
            required
            disabled={true}
          />
          <TextField
            name="email"
            value={userData.email}
            label="El. paštas"
            placeholder="vardenis@email.com"
            autoComplete="given-name"
            required
            disabled={true}
          />
          <TextField
            name="phone"
            value={userData.phone}
            label="Telefono numeris"
            required
            disabled={true}
          />
          <Button onClick={handleEditClick}>Keisti</Button>
        </form>
      )}
      {isEdit && (
        <form action="">
          {errors.general && (
            <div className={cn('errors')}>{errors.general}</div>
          )}
          <TextField
            name="first_name"
            value={newUserData.firstName}
            label="Vardas"
            onChange={handleFirstNameChange}
            required
          />
          {errors.firstName && (
            <div className={cn('errors')}>{errors.firstName}</div>
          )}
          <TextField
            name="last_name"
            value={newUserData.lastName}
            label="Pavardė"
            onChange={handleLastNameChange}
            required
          />
          {errors.lastName && (
            <div className={cn('errors')}>{errors.lastName}</div>
          )}
          <TextField
            name="email"
            value={newUserData.email}
            label="El. paštas"
            placeholder="vardenis@email.com"
            autoComplete="given-name"
            onChange={handleEmailChange}
            required
          />
          {errors.email && <div className={cn('errors')}>{errors.email}</div>}
          <TextField
            name="phone"
            value={newUserData.phone}
            label="Telefono numeris"
            onChange={handlePhoneChange}
            required
          />
          {errors.phone && <div className={cn('errors')}>{errors.phone}</div>}
          <Button type="submit" onClick={handleSubmit}>
            Išsaugoti
          </Button>
        </form>
      )}
    </div>
  );
};

export default UserForm;

UserForm.propTypes = {
  user: PropTypes.object,
};
