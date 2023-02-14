import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import useFetch from '../../utils/useFetch';
import styles from './CategoriesList.module.scss';

const cn = classNames.bind(styles);

const CategoriesList = ({ type }) => {
  const {
    data: categories,
    error,
    loading,
  } = useFetch(`${process.env.REACT_APP_API_URL}categories`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (type === undefined) {
    return (
      <div className={cn('list')}>
        {categories.map(({ id, name }) => (
          <Link key={id} className={cn('list__link')} to={`/products/${name}`}>
            {name}
          </Link>
        ))}
      </div>
    );
  }
  if (type === 'footer') {
    return (
      <div className={cn('list-footer')}>
        {categories.map(({ id, name }) => (
          <Link
            key={id}
            className={cn('list-footer__link')}
            to={`/products/${name}`}
          >
            {name}
          </Link>
        ))}
      </div>
    );
  }
};

export default CategoriesList;

CategoriesList.propTypes = {
  type: PropTypes.string,
};
