import styles from "./ShopCard.module.scss"
import Image from "next/image"


export default function ShopCard({ item }) {
    const image_dir = `https://shark-app-dcfyj.ondigitalocean.app/api/static/shop_logos/${item.logo_dir}`
    return (
        <div className={styles.shop}>
            <div className={styles.shop__image}>
                <Image
                    src={image_dir}
                    alt="Shop image"
                    width={256}
                    height={256}
                    className={styles.shop__image}
                />
            </div>
            <div className={styles.Shop__text}>
                <div className={styles.Shop__name}>{item.name}</div>
            </div>
        </div>
    )
}