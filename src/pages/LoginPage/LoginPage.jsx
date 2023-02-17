import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button/Button';
import TextField from '../../components/FormComponents/TextField/TextField';
import Heading from '../../components/Heading/Heading';
import { login, useAuth } from '../../utils/useAuth';
import styles from './LoginPage.module.scss';

const cn = classNames.bind(styles);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const [logged] = useAuth();

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
    fetch(`${process.env.REACT_APP_API_URL}login`, {
      method: 'post',
      body: JSON.stringify(opts),
    })
      .then((r) => r.json())
      .then((token) => {
        if (token.access_token) {
          login(token);
          console.log(token);
          navigate('/profile');
        } else {
          setErrors({ general: 'Įveskite teisingus el. paštą ir slaptažodį' });
        }
      });
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
      <form action="#" className={cn('form')}>
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

export default LoginPage;
