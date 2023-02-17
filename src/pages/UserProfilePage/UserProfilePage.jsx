import classNames from 'classnames/bind';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Tabs from '../../components/Tabs/Tabs';
import { UserForm } from '../../components/UserForm/UserForm';
import { logout } from '../../utils/useAuth';
import styles from './UserProfilePage.module.scss';

const cn = classNames.bind(styles);

const UserProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const tab_content = [
    {
      title: 'Mano duomenys',
      children: <UserForm />,
    },
    {
      title: 'Mano užsakymai',
      children:
        'Vero lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente accusamus fugiat vero consectetur quis numquam id, amet explicabo nobis ad rerum, sed doloremque, atque cupiditate harum nam esse dignissimos ea.',
    },
    {
      title: 'Mano adresai',
      children:
        'Quis vero lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente accusamus fugiat vero consectetur quis numquam id, amet explicabo nobis ad rerum, sed doloremque, atque cupiditate harum nam esse dignissimos ea.',
    },
    {
      title: 'Mano parduotuvės',
      children:
        'Quis vero lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente accusamus fugiat vero consectetur quis numquam id, amet explicabo nobis ad rerum, sed doloremque, atque cupiditate harum nam esse dignissimos ea.',
    },
    {
      title: (
        <button className={cn('logout-button')} onClick={() => handleLogout()}>
          Atsijungti
        </button>
      ),
      children:
        'Quis vero lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente accusamus fugiat vero consectetur quis numquam id, amet explicabo nobis ad rerum, sed doloremque, atque cupiditate harum nam esse dignissimos ea.',
    },
  ];
  return (
    <div>
      <Heading text="Vartotojo skiltis" />
      <Tabs tab_content={tab_content} />
    </div>
  );
};

export default UserProfilePage;
