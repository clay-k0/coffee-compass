import Head from "next/head";
import styles from "../styles/Home.module.css";

import Banner from "../components/banner";
import Card from "../components/card";

import { fetchCoffeeStores } from "../lib/coffee-stores";

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStores,
    },
  };
}

export default function Home(props) {
  const handleOnBannerButtonClick = () => {
    const localCoffeeStores = document.getElementById("coffee-stores");
    localCoffeeStores.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>coffee compass | find coffee near you!</title>
          <meta name='description' content='Generated by create next app' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className={styles.main}>
          <Banner
            buttonText='view shops nearby'
            handleOnClick={handleOnBannerButtonClick}
          />
          {props.coffeeStores.length > 0 ? (
            <>
              <br id='coffee-stores' />
              <h2 className={styles.heading2}>virginia beach coffee shops</h2>
              <div className={styles.cardLayout}>
                {props.coffeeStores.map((coffeeStore) => {
                  return (
                    <Card
                      key={coffeeStore.id}
                      shopName={coffeeStore.name}
                      imgURL={
                        coffeeStore.imgURL ||
                        "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                      }
                      href={`/coffee-store/${coffeeStore.id}`}
                      className={styles.card}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <h2 className={styles.heading2}>
              sorry... no coffee shops found :(
            </h2>
          )}
        </main>
      </div>
    </>
  );
}
