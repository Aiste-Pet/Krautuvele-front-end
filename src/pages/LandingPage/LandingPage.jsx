import React from 'react'
import styles from './LandingPage.module.scss'
import Heading from '../../components/Heading/Heading';
import hero from '../../assets/Pirk ir Parduok.gif'
import ListFetcher from '../../components/ListFetcher/ListFetcher';

import classNames from 'classnames/bind';

const cn = classNames.bind(styles);


const LandingPage = () => {
  const newest_api_link = "https://shark-app-dcfyj.ondigitalocean.app/api/products/newest";
  const popular_api_link = "https://shark-app-dcfyj.ondigitalocean.app/api/products/popular";
  const best_rated_shops = "https://shark-app-dcfyj.ondigitalocean.app/api/shops/best-rated";
  return (
    <div className={cn('page-body')}>
      <div className={cn('page-body__hero')}>
        <img src={hero} alt="" />
      </div>
      <article>
        <Heading text="Naujienos" />
        <ListFetcher api_url={newest_api_link} slider="true" />
      </article>
      <article className={cn('page-body__popular-shops')}>
        <Heading text="Populiarios parduotuvės" type="light" />
        <ListFetcher api_url={best_rated_shops} type="shop" slider="true" />
      </article>
      <article>
        <Heading text="Daugiausiai perkama" />
        <ListFetcher api_url={popular_api_link} slider="true" />
      </article>
      <article>
        <Heading text="Arčiausiai tavęs" />
        <ListFetcher api_url={popular_api_link} slider="true" />
        {/* TO-DO */} 
      </article>
    </div>
  )}

export default LandingPage