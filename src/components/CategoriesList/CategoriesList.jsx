import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './CategoriesList.module.scss';

const cn = classNames.bind(styles);

const CategoriesList = ({ type }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

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
