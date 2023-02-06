import styles from "./Header.module.scss"

export default function Header({ text }) {
    return (
        <h1 className={styles.header}>{text}</h1>
    )
}