import styles from "./ProductCard.module.scss"
import Image from "next/image"

const currency = "€"
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
                    className={styles.product-image}
                />
            </div>
            <div className={styles.product__text}>
                    <div className={styles.product__text-name}>{item.name}</div>
                    <div className={styles.product__text-price}><strong>{item.price} {currency}</strong></div>
            </div>
        </div>
    )
}