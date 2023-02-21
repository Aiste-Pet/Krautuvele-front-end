import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Button from '../Button/Button';
import AddressForm from '../Forms/AddressForm/AddressForm';
import styles from './AddressTable.module.scss';

const cn = classNames.bind(styles);

const AddressTable = ({ addresses }) => {
  const [isAdd, setIsAdd] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAdd = () => {
    setIsAdd(true);
  };

  const handleDelete = async (id) => {
    try {
      const authKey = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
      const { access_token } = JSON.parse(authKey);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}address-delete/${id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        removeAddress(id);
        setSuccessMessage('Adresas ištrintas sėkmingai');
      } else {
        setErrorMessage('Įvyko klaida:', response.statusText);
      }
    } catch (error) {
      setErrorMessage('Įvyko klaida:', error);
    }
  };

  const removeAddress = (id) => {
    const indexToRemove = addresses.findIndex((item) => item.id === id);
    if (indexToRemove !== -1) {
      addresses.splice(indexToRemove, 1);
    }
  };

  return (
    <div>
      {errorMessage && <div className={cn('errors')}>{errorMessage}</div>}
      {successMessage && <div className={cn('success')}>{successMessage}</div>}
      <div className={cn('table-wrapper')}>
        <table className={cn('table-wrapper__fl-table')}>
          <thead>
            <tr>
              <th>Adresas</th>
              <th>Miestas</th>
              <th>Pašto kodas</th>
              <th>Šalis</th>
              <th>Veiksmas</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map(
              ({ id, address_line, city, country, postal_code }) => (
                <tr key={id}>
                  <td data-label="Adresas">{address_line}</td>
                  <td data-label="Miestas">{city}</td>
                  <td data-label="Pašto kodas">{postal_code}</td>
                  <td data-label="Šalis">{country}</td>
                  <td data-label="Veiksmas">
                    <Button onClick={() => handleDelete(id)}>Trinti</Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <Button onClick={handleAdd}>Pridėti</Button>
      {isAdd && <AddressForm />}
    </div>
  );
};

export default AddressTable;

AddressTable.propTypes = {
  addresses: PropTypes.array,
};
