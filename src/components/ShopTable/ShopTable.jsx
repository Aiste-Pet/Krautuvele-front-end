import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Button from '../Button/Button';
import ShopForm from '../Forms/ShopForm/ShopForm';
import styles from './ShopTable.module.scss';

const cn = classNames.bind(styles);

const ShopTable = ({ shops }) => {
  const [isAdd, setIsAdd] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [newShops, setNewShops] = useState(shops);

  const handleAdd = () => {
    setIsAdd(true);
  };

  const handleDelete = async (id) => {
    try {
      const authKey = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
      const { access_token } = JSON.parse(authKey);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}shop-delete/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        removeShop(id);
        setSuccessMessage('Parduotuvė ištrinta sėkmingai');
      } else {
        setErrorMessage('Įvyko klaida:', response.statusText);
      }
    } catch (error) {
      setErrorMessage('Įvyko klaida:', error);
    }
  };

  const removeShop = (id) => {
    const indexToRemove = newShops.findIndex((item) => item.id === id);
    if (indexToRemove !== -1) {
      const updatedshops = [
        ...newShops.slice(0, indexToRemove),
        ...newShops.slice(indexToRemove + 1),
      ];
      setNewShops(updatedshops);
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
              <th>Pavadinimas</th>
              <th>Aprašymas</th>
              <th>Šūkis</th>
              <th>Parduota prekių</th>
              <th>Reitingas</th>
              <th>Veiksmas</th>
            </tr>
          </thead>
          <tbody>
            {newShops.map(
              ({ id, name, description, slogan, items_sold, rating }) => (
                <tr key={id}>
                  <td data-label="Pavadinimas">
                    <a className={cn('link')} href={`/shop/${id}`}>
                      {name}
                    </a>
                  </td>
                  <td data-label="Aprašymas">{description}</td>
                  <td data-label="Šūkis">{slogan}</td>
                  <td data-label="Parduota prekių">{items_sold}</td>
                  <td data-label="Reitingas">{rating}</td>
                  <td data-label="Veiksmas">
                    <Button class="celled" onClick={() => handleDelete(id)}>
                      Trinti
                    </Button>
                    <br />
                    <Button class="celled" onClick={() => console.log('edit')}>
                      Keisti
                    </Button>
                    <br />
                    <Button
                      class="celled"
                      onClick={() => console.log('products')}
                    >
                      Žiūrėti produktus
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className={cn('buttons')}>
        {!isAdd && (
          <Button onClick={handleAdd}>Pridėti naują parduotuvę</Button>
        )}
      </div>
      {isAdd && (
        <ShopForm
          setIsAdd={setIsAdd}
          setNewShops={setNewShops}
          newShops={newShops}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
        />
      )}
    </div>
  );
};

export default ShopTable;

ShopTable.propTypes = {
  shops: PropTypes.array,
};
