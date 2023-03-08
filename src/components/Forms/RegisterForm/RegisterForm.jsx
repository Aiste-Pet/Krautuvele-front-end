import classNames from 'classnames/bind';
import React, { useState } from 'react';

import Button from '../../Button/Button';
import TextField from '../../FormComponents/TextField/TextField';
import Heading from '../../Heading/Heading';
import styles from './RegisterForm.module.scss';

const cn = classNames.bind(styles);

const RegisterForm = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateUserData = () => {
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phone_regex = /(86|\+3706)\d{3}\d{4}/;
    const validationErrors = {};

    if (!userData.firstName) {
      validationErrors.firstName = 'Vardas yra privalomas';
    }

    if (!userData.lastName) {
      validationErrors.lastName = 'Pavardė yra privaloma';
    }
    if (!userData.email) {
      validationErrors.email = 'El. pašto adresas yra privalomas';
    } else if (!email_regex.test(userData.email)) {
      validationErrors.email = 'El. pašto formatas yra neteisingas';
    }
    if (!userData.phone) {
      validationErrors.phone = 'Telefonas yra privalomas';
    } else if (!phone_regex.test(userData.phone)) {
      validationErrors.phone = 'Telefono numerio formatas yra neteisingas';
    }
    if (!userData.password) {
      validationErrors.password = 'Slaptažodis yra privalomas';
    }
    if (!userData.confirmPassword) {
      validationErrors.confirmPassword = 'Pakartokite slaptažodį';
    }
    if (userData.confirmPassword !== userData.password) {
      validationErrors.password = 'Slaptažodžiai turi sutapti';
    }

    return validationErrors;
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    let validationErrors = validateUserData();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    createUser();
  };

  const createUser = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        setSuccessMessage('Paskyra sukurta sėkmingai, prašome prisijungti');
      } else {
        if (response.status === 409) {
          setErrorMessage(
            'Vartotojas su tokiu el. paštu jau egzistuoja, prašome prisijungti'
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
    setUserData((prevState) => ({
      ...prevState,
      firstName: newFirstName,
    }));
  }, []);

  const handleLastNameChange = React.useCallback((event) => {
    const newLastName = event.target.value;
    setUserData((prevState) => ({
      ...prevState,
      lastName: newLastName,
    }));
  }, []);

  const handleEmailChange = React.useCallback((event) => {
    const newEmail = event.target.value;
    setUserData((prevState) => ({
      ...prevState,
      email: newEmail,
    }));
  }, []);

  const handlePhoneChange = React.useCallback((event) => {
    const newPhone = event.target.value;
    setUserData((prevState) => ({
      ...prevState,
      phone: newPhone,
    }));
  }, []);

  const handlePasswordChange = React.useCallback((event) => {
    const newPassword = event.target.value;
    setUserData((prevState) => ({
      ...prevState,
      password: newPassword,
    }));
  }, []);

  const handleConfirmPasswordChange = React.useCallback((event) => {
    const newConfirmPassword = event.target.value;
    setUserData((prevState) => ({
      ...prevState,
      confirmPassword: newConfirmPassword,
    }));
  }, []);

  return (
    <div>
      <Heading text="Susikurti paskyrą" />
      <form action="#">
        {errorMessage && <div className={cn('errors')}>{errorMessage}</div>}
        {successMessage && (
          <div className={cn('success')}>{successMessage}</div>
        )}
        {errors.general && <div className={cn('errors')}>{errors.general}</div>}
        <TextField
          name="first_name"
          value={userData.firstName}
          placeholder="Vardenis"
          label="Vardas"
          onChange={handleFirstNameChange}
          required
        />
        {errors.firstName && (
          <div className={cn('errors')}>{errors.firstName}</div>
        )}
        <TextField
          name="last_name"
          value={userData.lastName}
          label="Pavardė"
          placeholder="Pavardenis"
          onChange={handleLastNameChange}
          required
        />
        {errors.lastName && (
          <div className={cn('errors')}>{errors.lastName}</div>
        )}
        <TextField
          name="email"
          value={userData.email}
          label="El. paštas"
          placeholder="vardenis@email.com"
          onChange={handleEmailChange}
          required
        />
        {errors.email && <div className={cn('errors')}>{errors.email}</div>}
        <TextField
          name="phone"
          value={userData.phone}
          label="Telefono numeris"
          placeholder="861234567"
          onChange={handlePhoneChange}
          required
        />
        {errors.phone && <div className={cn('errors')}>{errors.phone}</div>}
        <TextField
          name="password"
          value={userData.password}
          type="password"
          label="Slaptažodis"
          placeholder="**********"
          onChange={handlePasswordChange}
          required
        />
        {errors.password && (
          <div className={cn('errors')}>{errors.password}</div>
        )}
        <TextField
          name="confirmPassword"
          value={userData.confirmPassword}
          type="password"
          label="Pakartokite slaptažodį"
          placeholder="**********"
          onChange={handleConfirmPasswordChange}
          required
        />
        {errors.password && (
          <div className={cn('errors')}>{errors.password}</div>
        )}
        <Button onClick={onSubmitClick} type="submit">
          Registruotis
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
