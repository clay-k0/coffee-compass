import Image from "next/image";
import Link from "next/link";
import styles from "./card.module.css";
import cls from "classnames";

const Card = (props) => {
  return (
    <Link href={props.href}>
      <div className={styles.cardLink}>
        <div className={cls("glass", styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{props.shopName}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              src={props.imgURL}
              width={300}
              height={210}
              className={styles.cardImage}
              alt='card component'
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
