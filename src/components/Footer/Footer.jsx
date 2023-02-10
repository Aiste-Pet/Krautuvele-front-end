import CategoriesList from "../CategoriesList/CategoriesList"
import styles from "./Footer.module.scss"
import IconSocial from "../IconSocial/IconSocial";


const SOCIALS = [
    {
        name: 'Facebook',
        link: 'https://www.facebook.com/',
        image: '/Icon_facebook.svg',
        alt: 'Sourcery Facebook page',
    },
    {
        name: 'Twitter',
        link: 'https://twitter.com/',
        image: '/Icon_twitter.svg',
        alt: 'Sourcery Twitter page',
    },
    {
        name: 'Instagram',
        link: 'https://www.instagram.com/',
        image: '/Icon_instagram.svg',
        alt: 'Sourcery Instagram page',
    },
];

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__text}>
                <div>
                    <div>Produktų kategorijos</div>
                    <div><CategoriesList type="footer" /></div>
                </div>
                <div>
                    <div>Apie Mus</div>
                    <div><ul className={styles.footer__list}><li>Susisiekime</li><li>Apie Mus</li><li>Karjera</li><li>Spauda</li></ul></div>
                </div>
                <div>
                    <div>Taisyklės</div>
                    <div><ul className={styles.footer__list}><li>Pirkimo taisyklės</li><li>Mokėjimas</li><li>Grąžinimas</li><li>Siuntimas</li><li>Duomenų apsauga</li></ul></div>
                </div>
            </div>
            <div className={styles.footer__links}>
                <div className={styles.footer__socials}>{SOCIALS.map(({ name, link, image, alt }) => (
                    <IconSocial key={name} link={link} alt={alt} image_src={image} />
                ))}</div>
                <div>© Krautuvele.lt 2023 Visos teisės saugomos</div>
            </div>
        </footer>
    )
}