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
            <li onClick={() => scrollToSection('about')}>Apie parduotuv??</li>
            <li onClick={() => scrollToSection('buying')}>
              Pirkimas ir pristatymas
            </li>
            <li onClick={() => scrollToSection('contacts')}>Kontaktai</li>
          </ul>
        </div>
        <article className={cn('article')} ref={sectionRefs.about} id="about">
          <div className={cn('article__heading')}>Apie parduotuv??</div>

          <div>{shop.description}</div>
        </article>
        <article className={cn('article')} ref={sectionRefs.buying} id="buying">
          <div className={cn('article__heading')}>Pirkimas ir pristatymas</div>
          <div>
            M??s?? parduotuv??je galite ??sigyti ??vairi?? preki?? - nuo drabu??i?? ir
            avalyn??s iki buitin??s technikos ir elektronikos. Nor??dami nusipirkti
            prekes, tiesiog pasirinkite norim?? produkt?? ir ??d??kite j?? ?? savo
            krep??el??. Kai esate pasiruo???? atlikti u??sakym??, eikite ?? krep??elio
            puslap??, u??pildykite reikiamus duomenis ir pasirinkite mok??jimo
            b??d??. Mes priimame mok??jimus per bank?? kortel??, pavedim?? arba per
            mok??jimo sistem??. Pasirinkus mok??jimo b??d?? ir patvirtinus u??sakym??,
            mes pradedame ruo??ti j??s?? prekes. Kai prek??s yra paruo??tos
            pristatymui, mes siun??iame jums prane??im?? apie siuntimo b??d?? ir
            numatyt?? pristatymo dat??. Mes naudojame patikimas pristatymo
            bendroves, kad j??s?? prek??s pasiekt?? j??s?? adres?? kuo grei??iau. Jei
            u??sakymas neatitinka j??s?? l??kes??i?? ar yra pa??eistas per pristatym??,
            pra??ome susisiekti su m??s?? klient?? aptarnavimo komanda, kad gal??tume
            i??spr??sti bet kokias problemas ir u??tikrinti j??s?? pasitenkinim?? m??s??
            paslaugomis. D??kojame, kad pasirinkote m??s?? parduotuv?? ir tikim??s
            matyti jus v??l ateityje!
          </div>
        </article>
        <article
          className={cn('article')}
          ref={sectionRefs.contacts}
          id="contacts"
        >
          <div className={cn('article__heading')}>Kontaktai</div>
          <div>
            Parduotuv??s adresas: UAB Pavyzdin?? Parduotuv?? Gatv??s pavadinimas
            123, Miestas, LT-12345, Lietuva Klient?? aptarnavimo telefono
            numeris: +370 6XX XXXXX Klient?? aptarnavimo elektroninio pa??to
            adresas: klientuaptarnavimas@pavyzdineparduotuve.lt Darbo laikas:
            I-V 9:00 - 18:00 val. VI 9:00 - 16:45 val. VII nedirbame M??s??
            komanda visuomet pasiruo??usi Jums pad??ti. Jei turite klausim?? ar
            reikia pagalbos, maloniai pra??ome susisiekti su mumis.
          </div>
        </article>

        <Heading text="Parduotuv??s prek??s" />
        <div className={cn('product-list')}>
          <ProductGallery api_url={products_api_link} />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
