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

  const navigate = useNavigate();

  const [logged] = useAuth();

  const onSubmitClick = (e) => {
    e.preventDefault();
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
          navigate('/profile');
        } else {
          console.log('Please type in correct email/password');
        }
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
        <TextField
          name="email"
          value={email}
          label="El. paštas"
          placeholder="vardenis@email.com"
          onChange={handleEmailChange}
          autoComplete="given-name"
        />
        <TextField
          name="password"
          value={password}
          type="password"
          label="Slaptažodis"
          placeholder="**********"
          onChange={handlePasswordChange}
        />
        <Button onClick={onSubmitClick} type="submit">
          Prisijungti
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
