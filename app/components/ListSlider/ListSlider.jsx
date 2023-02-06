import ShopCard from "../ShopCard/ShopCard";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ListSlider.module.scss"
import SimpleBarContainer from "../SimpleBarContainer/SimpleBarContainer";


export default async function ListSlider({ api_url, type }) {
    const data = await fetch(api_url)
    const LIST = await data.json()
    let element;
    if (type === undefined) {
        element = LIST.map((item) => <div className={styles.list__item} key={item.id}><ProductCard key={item.id} item={item} /></div>)
    };
    if (type === "shop") {
        element = LIST.map((item) => <div className={styles.list__item} key={item.id}><ShopCard key={item.id} item={item} /></div>)
    };

    return (
        <div className={styles.list}>
            {/* <SimpleBarContainer element={element} /> */}
            {element}
        </div>
    )
}