import classNames from 'classnames/bind';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import AddressTable from '../../components/AddressTable/AddressTable';
import UserForm from '../../components/Forms/UserForm/UserForm';
import Heading from '../../components/Heading/Heading';
import OrderTable from '../../components/OrderTable/OrderTable';
import ShopTable from '../../components/ShopTable/ShopTable';
import Tabs from '../../components/Tabs/Tabs';
import { logout } from '../../utils/useAuth';
import useAuthFetch from '../../utils/useAuthFetch';
import styles from './UserProfilePage.module.scss';

const cn = classNames.bind(styles);

const UserProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const {
    data: user,
    error: user_error,
    loading: user_loading,
  } = useAuthFetch(`${import.meta.env.VITE_API_URL}user-data`);

  if (user_loading) return <p>Loading...</p>;

  if (user_error && user_error.message === '401') {
    window.localStorage.clear('jwt');
    window.location = '/login';
  }

  if (user_error) return <p>Error: {user_error.message}</p>;

  const tab_content = [
    {
      title: 'Mano duomenys',
      children: <UserForm user={user} />,
    },
    {
      title: 'Mano užsakymai',
      children: <OrderTable orders={user.orders} />,
    },
    {
      title: 'Mano adresai',
      children: <AddressTable addresses={user.addresses} />,
    },
    {
      title: 'Mano parduotuvės',
      children: <ShopTable shops={user.shops} />,
    },
    {
      title: (
        <button className={cn('logout-button')} onClick={() => handleLogout()}>
          Atsijungti
        </button>
      ),
      children: '',
    },
  ];
  return (
    <div>
      <Heading text={`Sveiki, ${user.first_name}`} />
      <Tabs tab_content={tab_content} />
    </div>
  );
};

export default UserProfilePage;
