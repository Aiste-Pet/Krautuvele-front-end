import classNames from 'classnames/bind';
import React from 'react';

import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm';
import styles from './LoginPage.module.scss';

const cn = classNames.bind(styles);

const LoginPage = () => {
  return (
    <div className={cn('login-page')}>
      <div className={cn('login-page__login-form')}>
        <LoginForm />
      </div>
      <div className={cn('login-page__register-form')}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default LoginPage;
