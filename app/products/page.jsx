import styles from './page.module.scss'
import Header from '../components/Header/Header'
import ListFetcher from '../components/ListFetcher/ListFetcher';

const newest_api_link = "https://shark-app-dcfyj.ondigitalocean.app/api/products/newest";

export default function Home() {
  return (
    <div className={styles.page_body}>
      <article>
        <Header text="Naujienos" />
        <ListFetcher api_url={newest_api_link} />
      </article>
    </div>
  )
}
