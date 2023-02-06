import Link from "next/link"
import styles from "./CategoriesList.module.scss"

export default async function CategoriesList() {
    const data = await fetch('https://shark-app-dcfyj.ondigitalocean.app/api/categories')
    const CATEGORIES = await data.json()
    return (
        <ul className={styles.list}>
            {CATEGORIES.map(({ id, name }) => <li key={id} className={styles.list__item}><Link className={styles.list__link} href="/products" as={`/products?category=${name}`}>{name}</Link></li>)}
        </ul>
    )
}