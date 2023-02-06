import Link from "next/link"
import styles from "./Navbar.module.scss"
import Image from 'next/image'
import CategoriesList from "../CategoriesList/CategoriesList"



export default function Navbar() {
    return (
        <nav className={styles.navigation}>
            <div className={styles.navigation__top}>
                <Link href="/"><Image
                    src="/krautuvele.png"
                    alt="Logo"
                    width={150}
                    height={50}
                /></Link>
                <div className={styles.navigation__search}>
                    <Image
                        src="/search.svg"
                        alt="Logo"
                        width={30}
                        height={30}
                    />
                    <input className={styles.search__input} type="text" placeholder="Ieškoti parduotuvių ar prekių..." />
                </div>
                <div className={styles.navigation__icons}>
                    <Image
                        src="/profile.svg"
                        alt="Logo"
                        width={30}
                        height={30}
                        className={styles.icons__image}
                    />
                    <Image
                        src="/bag.svg"
                        alt="Logo"
                        width={30}
                        height={30}
                    />
                </div>
            </div>
            <div className={styles.navigation__bottom}>
                <CategoriesList />
            </div>
        </nav>
    )
}