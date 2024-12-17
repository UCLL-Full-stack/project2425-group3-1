import Head from "next/head";
import Image from "next/image";
import styles from "../styles/workouts.module.css";
import Header from "@/components/header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>{t("home.title")}</title>
          <meta name="description" content={t("home.metaDescription")} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />

        <main>
          <div className={styles.descriptionWrapper}>
            <div className={styles.description}>
              <p>{t("home.about")}</p>
            </div>
          </div>

          <div className={styles.homepageImage}>
            <Image
              src="/homepagepic.png"
              alt={t("home.homepageImageAlt")}
              width={350}
              height={350}
            />
          </div>
        </main>
      </div>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Home;
