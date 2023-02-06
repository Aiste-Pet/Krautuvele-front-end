import styles from "./ProductCard.module.scss"
import Image from "next/image"


export default function ProductCard({ item }) {
    const image_dir = `https://shark-app-dcfyj.ondigitalocean.app/api/${item.product_images[0]}`
    return (
        <div className={styles.product}>
            <div className={styles.product__image}>
                <Image
                    src={image_dir}
                    alt="Product image"
                    width={256}
                    height={256}
                    className={styles.product__image}
                />
            </div>
            <div className={styles.product__text}>
                <div className={styles.product__name}>{item.name}</div>
                <div className={styles.product__description}>{item.description}</div>
                <div className={styles.product__price}>{item.price}</div>
                <div className={styles.product__price}>{item.product_category_name}</div>
                <div className={styles.product__price}>{item.shop_name}</div>
            </div>
        </div>
    )
}