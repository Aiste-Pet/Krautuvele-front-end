import styles from './IconSocial.module.scss';
import Image from "next/image";

export default function IconSocial({ link, alt, image_src }) {
  return (
    <a
      href={link}
      className={styles.link}
      aria-label={alt}
      target="_blank"
      rel="noreferrer"
    >
      <Image
        src={image_src}
        alt={alt}
        width={38}
        height={38}
      />
    </a>
  );
};
