import React from 'react';
import { useNavigate } from 'react-router-dom';

import { logout } from '../../utils/useAuth';

const UserProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <div>
      UserProfilePage<button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
};

export default UserProfilePage;
