import Head from "next/head";
import Image from "next/image";
import styles from "../styles/workouts.module.css";
import Header from "@/components/header";

const Home: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Home</title>
          <meta name="description" content="FitNest application" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />

        <main>
          <div className={styles.description}>
            <p>
              Welcome to FitNest! Your Personalized Fitness Journey Starts Here
              At FitNest, we believe that fitness should be accessible,
              enjoyable, and tailored to your individual goals. Whether you’re
              looking to lose weight, gain strength, or maintain a healthy
              lifestyle, our app is designed to help you every step of the way.
            </p>
          </div>
          <div className={styles.description}>
            <p>add picture here</p>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
