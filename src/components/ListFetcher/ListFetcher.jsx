import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import ProductCard from '../ProductCard/ProductCard';
import ShopCard from '../ShopCard/ShopCard';
import Slider from '../Slider/Slider';
import styles from './ListFetcher.module.scss';

const cn = classNames.bind(styles);

const ListFetcher = ({ api_url, type, slider }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(api_url)
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [api_url]);
  let element;
  if (type === undefined) {
    element = list.map((item) => <ProductCard key={item.id} item={item} />);
  }
  if (type === 'shop') {
    element = list.map((item) => <ShopCard key={item.id} item={item} />);
  }
  if (slider === 'true') {
    return <Slider element={element} />;
  } else {
    return <div className={cn('products-list')}>{element}</div>;
  }
};

export default ListFetcher;

ListFetcher.propTypes = {
  api_url: PropTypes.string,
  type: PropTypes.string,
  slider: PropTypes.string,
};
