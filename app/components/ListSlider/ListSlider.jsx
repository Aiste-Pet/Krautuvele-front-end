import ShopCard from "../ShopCard/ShopCard";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ListSlider.module.scss"

export default async function ListSlider({ api_url, type }) {
    const data = await fetch(api_url)
    const LIST = await data.json()
    let element;
    if (type === undefined) {
        element = LIST.map((item) => <li className={styles.list__item} key={item.id}><ProductCard key={item.id} item={item} /></li>)
    };
    if (type === "shop") {
        element = LIST.map((item) => <li className={styles.list__item} key={item.id}><ShopCard key={item.id} item={item} /></li>)
    };

    return (
        <ul className={styles.list}>
            {element}
        </ul>
    )
}