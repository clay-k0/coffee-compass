import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import cls from "classnames";

import coffeeStoresData from "../../data/coffee-stores.json";

import styles from "../../styles/coffee-store.module.css";

export function getStaticProps({ params }) {
  return {
    props: {
      coffeeStore: coffeeStoresData.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id;
      }),
    },
  };
}

export function getStaticPaths() {
  const paths = coffeeStoresData.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>loading...</div>;
  }

  const { imgURL, address, shopName, neighborhood } = props.coffeeStore;

  const handleUpvoteButton = () => {};

  return (
    <div className={styles.layout}>
      <Head>
        <title>{shopName}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.column1}>
          <div className={styles.backToHomeLink}>
            <Link className={styles.backToHomeLinkText} href='/'>
              back to home
            </Link>
          </div>
          <div className={styles.shopNameWrapper}>
            <h1 className={styles.shopName}>{shopName}</h1>
          </div>
          <div className={styles.shopImgWrapper}>
            <Image
              src={imgURL}
              width={600}
              height={500}
              className={styles.shopImg}
              alt={shopName}
            />
          </div>
        </div>

        <div className={cls("glass", styles.column2)}>
          <div className={styles.iconWrapper}>
            <Image
              alt='address icon'
              src='/static/icons/places.svg'
              width={24}
              height={24}
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              alt='near me icon'
              src='/static/icons/nearMe.svg'
              width={24}
              height={24}
            />
            <p className={styles.text}>{neighborhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              alt='star icon'
              src='/static/icons/star.svg'
              width={24}
              height={24}
            />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            upvote
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
