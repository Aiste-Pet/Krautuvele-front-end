import styles from "./Header.module.scss"

export default function Header({ text, type }) {
    if (type === "light") {
        return <h1 className={styles.header_light}>{text}</h1>
    }
    else {
        return <h1 className={styles.header_dark}>{text}</h1>
    }
}