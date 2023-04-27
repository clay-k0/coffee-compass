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

  const handleDirectionsButton = () => {
    const userAgent = navigator.userAgent.toLocaleLowerCase();
    const isGoogleMaps = userAgent.indexOf("android") > -1;
    const isAppleMaps = userAgent.indexOf("iphone") > -1;

    if (isGoogleMaps) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${address}`
      );
    }

    if (isAppleMaps) {
      window.open(`http://maps.apple.com/?daddr=${address}`);
    }

    if (!isGoogleMaps && !isAppleMaps) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${address}`
      );
    }
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{shopName} | coffee compass</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.column1}>
          <div className={styles.backToHomeLink}>
            <Link
              className={styles.backToHomeLinkText}
              href='/'
              title='go back to homepage'
            >
              {"←"} back to home
            </Link>
          </div>
          <div className={styles.shopNameWrapper}>
            <h1 className={styles.shopName}>{shopName}</h1>
          </div>
          <div className={styles.shopImgWrapper}>
            <Image
              src={imgURL}
              width={630}
              height={550}
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
              title='address of coffee shop'
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              alt='near me icon'
              src='/static/icons/nearMe.svg'
              width={24}
              height={24}
              title='district of coffee shop'
            />
            <p className={styles.text}>{neighborhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              alt='star icon'
              src='/static/icons/star.svg'
              width={24}
              height={24}
              title='stars this coffee shop has'
            />
            <p className={styles.text}>1</p>
          </div>

          <div className={styles.buttonWrapper}>
            <button
              className={styles.upvoteButton}
              onClick={handleUpvoteButton}
              title='upvote this coffee shop'
            >
              upvote
            </button>
            <button
              className={styles.directionsButton}
              onClick={handleDirectionsButton}
              title='directions to this coffee shop'
            >
              directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
