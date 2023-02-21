import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './OrderTable.module.scss';

const cn = classNames.bind(styles);

const currency = '€';

const formatDate = (date) => {
  let newDate = new Date(date);
  let formattedDate = newDate.toISOString().substring(0, 10);
  return formattedDate;
};

const OrderTable = ({ orders }) => {
  return (
    <div>
      <div className={cn('table-wrapper')}>
        <table className={cn('table-wrapper__fl-table')}>
          <thead>
            <tr>
              <th scope="col">Užsakymo numeris</th>
              <th scope="col">Užsakymo data</th>
              <th scope="col">Užsakymo suma</th>
              <th scope="col">Užsakymo statusas</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(({ id, created_at, total, status }) => (
              <tr key={id}>
                <td scope="row" data-label="Užsakymo numeris">
                  {id}
                </td>
                <td scope="row" data-label="Užsakymo data">
                  {formatDate(created_at)}
                </td>
                <td scope="row" data-label="Užsakymo suma">
                  {total} {currency}
                </td>
                <td scope="row" data-label="Užsakymo statusas">
                  {status}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="4"> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;

OrderTable.propTypes = {
  orders: PropTypes.array,
};
