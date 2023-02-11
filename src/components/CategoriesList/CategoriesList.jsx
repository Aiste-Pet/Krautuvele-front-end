import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoriesList.module.scss';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const CategoriesList = ({ type }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch('https://shark-app-dcfyj.ondigitalocean.app/api/categories')
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
          <Link key={id} className={cn('list-footer__link')} to={`/products/${name}`}>
            {name}
          </Link>
        ))}
      </div>
    );
  }
};

export default CategoriesList;

CategoriesList.propTypes = {
  type: PropTypes.string
};
