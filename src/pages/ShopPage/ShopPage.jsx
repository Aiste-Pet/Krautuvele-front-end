import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Heading from '../../components/Heading/Heading';
import ProductGallery from '../../components/ProductGallery/ProductGallery';
import ShopRating from '../../components/ShopRating/ShopRating';
import useFetch from '../../utils/useFetch';
import styles from './ShopPage.module.scss';

const cn = classNames.bind(styles);

const ShopPage = () => {
  const location = useLocation();
  const selection = decodeURIComponent(location.pathname).replace('/shop/', '');
  const products_api_link = `${process.env.REACT_APP_API_URL}shop-products/${selection}`;
  const shop_api_link = `${process.env.REACT_APP_API_URL}shop/${selection}`;

  const [activeLink, setActiveLink] = useState('');
  console.log(activeLink); //TO DO

  const sectionRefs = {
    about: useRef(null),
    buying: useRef(null),
    contacts: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' } // adjust the rootMargin to your liking
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const scrollToSection = (section) => {
    sectionRefs[section].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const {
    data: shop,
    error: shop_error,
    loading: shop_loading,
  } = useFetch(shop_api_link);

  if (shop_loading) return <p>Loading...</p>;
  if (shop_error) return <p>Error: {shop_error.message}</p>;

  return (
    <div>
      <div>
        <div className={cn('header')}>
          <img
            src={`${process.env.REACT_APP_API_URL}static/shop_logos/${shop.logo_dir}`}
            alt=""
          />
          <div>
            <ShopRating shop_id={shop.id} />
          </div>
        </div>
        <div className={cn('header__nav')}>
          <ul>
            <li onClick={() => scrollToSection('about')}>Apie parduotuvę</li>
            <li onClick={() => scrollToSection('buying')}>
              Pirkimas ir pristatymas
            </li>
            <li onClick={() => scrollToSection('contacts')}>Kontaktai</li>
          </ul>
        </div>
        <article className={cn('article')} ref={sectionRefs.about} id="about">
          <div className={cn('article__heading')}>Apie parduotuvę</div>

          <div>{shop.description}</div>
        </article>
        <article className={cn('article')} ref={sectionRefs.buying} id="buying">
          <div className={cn('article__heading')}>Pirkimas ir pristatymas</div>
          <div>
            Mūsų parduotuvėje galite įsigyti įvairių prekių - nuo drabužių ir
            avalynės iki buitinės technikos ir elektronikos. Norėdami nusipirkti
            prekes, tiesiog pasirinkite norimą produktą ir įdėkite jį į savo
            krepšelį. Kai esate pasiruošę atlikti užsakymą, eikite į krepšelio
            puslapį, užpildykite reikiamus duomenis ir pasirinkite mokėjimo
            būdą. Mes priimame mokėjimus per bankų kortelę, pavedimą arba per
            mokėjimo sistemą. Pasirinkus mokėjimo būdą ir patvirtinus užsakymą,
            mes pradedame ruošti jūsų prekes. Kai prekės yra paruoštos
            pristatymui, mes siunčiame jums pranešimą apie siuntimo būdą ir
            numatytą pristatymo datą. Mes naudojame patikimas pristatymo
            bendroves, kad jūsų prekės pasiektų jūsų adresą kuo greičiau. Jei
            užsakymas neatitinka jūsų lūkesčių ar yra pažeistas per pristatymą,
            prašome susisiekti su mūsų klientų aptarnavimo komanda, kad galėtume
            išspręsti bet kokias problemas ir užtikrinti jūsų pasitenkinimą mūsų
            paslaugomis. Dėkojame, kad pasirinkote mūsų parduotuvę ir tikimės
            matyti jus vėl ateityje!
          </div>
        </article>
        <article
          className={cn('article')}
          ref={sectionRefs.contacts}
          id="contacts"
        >
          <div className={cn('article__heading')}>Kontaktai</div>
          <div>
            Parduotuvės adresas: UAB Pavyzdinė Parduotuvė Gatvės pavadinimas
            123, Miestas, LT-12345, Lietuva Klientų aptarnavimo telefono
            numeris: +370 6XX XXXXX Klientų aptarnavimo elektroninio pašto
            adresas: klientuaptarnavimas@pavyzdineparduotuve.lt Darbo laikas:
            I-V 9:00 - 18:00 val. VI 9:00 - 16:45 val. VII nedirbame Mūsų
            komanda visuomet pasiruošusi Jums padėti. Jei turite klausimų ar
            reikia pagalbos, maloniai prašome susisiekti su mumis.
          </div>
        </article>

        <Heading text="Parduotuvės prekės" />
        <div className={cn('product-list')}>
          <ProductGallery api_url={products_api_link} />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
