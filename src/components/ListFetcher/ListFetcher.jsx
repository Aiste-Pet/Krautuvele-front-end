import ShopCard from '../ShopCard/ShopCard';
import ProductCard from '../ProductCard/ProductCard';
import Slider from '../Slider/Slider';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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
    element = list.map((item) => (
      <div key={item.id}>
        <ProductCard key={item.id} item={item} />
      </div>
    ));
  }
  if (type === 'shop') {
    element = list.map((item) => (
      <div key={item.id}>
        <ShopCard key={item.id} item={item} />
      </div>
    ));
  }
  if (slider === 'true') {
    return (
      <div>
        <Slider element={element} />
      </div>
    );
  } else {
    return <div>{element}</div>;
  }
};

export default ListFetcher;

ListFetcher.propTypes = {
  api_url: PropTypes.string,
  type: PropTypes.string,
  slider: PropTypes.string
};
