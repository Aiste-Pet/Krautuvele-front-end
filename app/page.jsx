import styles from './page.module.scss'
import Image from 'next/image'
import Header from './components/Header/Header'
import hero from '../public/hero.gif'
import ListFetcher from './components/ListFetcher/ListFetcher'

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
        <ListFetcher api_url={newest_api_link} slider="true" />
      </article>
      <article className={styles.popular_shops}>
        <Header text="Populiarios parduotuvės" type="light" />
        <ListFetcher api_url={best_rated_shops} type="shop" slider="true" />
      </article>
      <article>
        <Header text="Daugiausiai perkama" />
        <ListFetcher api_url={popular_api_link} slider="true" />
      </article>
      <article>
        <Header text="Arčiausiai tavęs" />
        <ListFetcher api_url={popular_api_link} slider="true" />
        {/* TO-DO */}
      </article>
    </div>
  )
}
