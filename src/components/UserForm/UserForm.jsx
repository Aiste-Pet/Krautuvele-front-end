import React from 'react';

import useAuthFetch from '../../utils/useAuthFetch';
import TextField from '../FormComponents/TextField/TextField';

export const UserForm = () => {
  const {
    data: user,
    error: user_error,
    loading: user_loading,
  } = useAuthFetch(`${process.env.REACT_APP_API_URL}user-data`);

  if (user_loading) return <p>Loading...</p>;
  if (user_error) return <p>Error: {user_loading.message}</p>;

  const handleInput = () => {
    console.log(test);
  };

  return (
    <div>
      <TextField
        name="first_name"
        value={user.first_name}
        label="Vardas"
        onChange={handleInput}
        required
        disabled={true}
      />
      <TextField
        name="last_name"
        value={user.last_name}
        label="Pavardė"
        onChange={handleInput}
        required
        disabled={true}
      />
      <TextField
        name="email"
        value={user.email}
        label="El. paštas"
        placeholder="vardenis@email.com"
        autoComplete="given-name"
        onChange={handleInput}
        required
        disabled={true}
      />
      <TextField
        name="phone"
        value={user.phone}
        label="Telefono numeris"
        onChange={handleInput}
        required
        disabled={true}
      />
    </div>
  );
};
