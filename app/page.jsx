import styles from './page.module.scss'
import Image from 'next/image'
import Header from './components/Header/Header'
import hero from '../public/hero.png'
import ListSlider from './components/ListSlider/ListSlider'
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export default function Home() {
  const newest_api_link = "https://shark-app-dcfyj.ondigitalocean.app/api/products/newest";
  const popular_api_link = "https://shark-app-dcfyj.ondigitalocean.app/api/products/popular";
  const best_rated_shops = "https://shark-app-dcfyj.ondigitalocean.app/api/shops/best-rated";
  return (
    <div className={styles.page_body}>
      <div className={styles.hero}>
        <Image
          src={hero}
          alt="Hero Banner"
          className={styles.hero__image}
        />
      </div>
      <article>
        <Header text="Naujienos" />
        <ListSlider api_url={newest_api_link} />
      </article>
      <article className={styles.popular_shops}>
        <Header text="Populiarios parduotuvės" type="light" />
        <ListSlider api_url={best_rated_shops} type="shop" />
      </article>
      <article>
        <Header text="Daugiausiai perkama" />
        <ListSlider api_url={popular_api_link} />
      </article>
      <article>
        <Header text="Arčiausiai tavęs" />
        <ListSlider api_url={popular_api_link} />
        {/* TO-DO */}
      </article>
    </div>
  )
}
