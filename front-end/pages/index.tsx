import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
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
          <span>
            <Image
              src="/images/Homepage_Pic.png"
              alt="Muscular man"
              width={50}
              height={50}
            />
            <h1>Welcome!</h1>
          </span>
        </main>
      </div>
    </>
  );
};

export default Home;
