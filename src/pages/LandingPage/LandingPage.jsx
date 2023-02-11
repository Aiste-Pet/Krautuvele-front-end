import classNames from 'classnames/bind';
import React from 'react';
import { Link } from 'react-router-dom';

import hero from '../../assets/Pirk ir Parduok.gif';
import Heading from '../../components/Heading/Heading';
import ListFetcher from '../../components/ListFetcher/ListFetcher';
import styles from './LandingPage.module.scss';

const cn = classNames.bind(styles);

const LandingPage = () => {
  const newest_api_link = `${process.env.REACT_APP_API_URL}products/category/Naujienos`;
  const popular_api_link = `${process.env.REACT_APP_API_URL}products/category/Populiaru`;
  const best_rated_shops = `${process.env.REACT_APP_API_URL}shops/best-rated`;
  console.log(newest_api_link);
  return (
    <div>
      <div className={cn('page-body__hero')}>
        <img src={hero} alt="" />
      </div>
      <article>
        <div className={cn('page-body__headers')}>
          <Heading text="Naujienos" />
          <Link className={cn('page-body__link')} to={'/products/Naujienos'}>
            Žiūrėti visus
          </Link>
        </div>
        <ListFetcher api_url={newest_api_link} slider="true" />
      </article>
      <article className={cn('page-body__popular-shops')}>
        <Heading text="Populiarios parduotuvės" type="light" />
        <ListFetcher api_url={best_rated_shops} type="shop" slider="true" />
      </article>
      <article>
        <div className={cn('page-body__headers')}>
          <Heading text="Daugiausiai perkama" />
          <Link className={cn('page-body__link')} to={'/products/Populiaru'}>
            Žiūrėti visus
          </Link>
        </div>
        <ListFetcher api_url={popular_api_link} slider="true" />
      </article>
      <article>
        <div className={cn('page-body__headers')}>
          <Heading text="Arčiausiai tavęs" />
          <Link className={cn('page-body__link')} to={'/products/Naujienos'}>
            Žiūrėti visus
          </Link>
        </div>
        <ListFetcher api_url={popular_api_link} slider="true" />
        {/* TO-DO */}
      </article>
    </div>
  );
};

export default LandingPage;
