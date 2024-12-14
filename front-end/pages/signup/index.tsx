import Head from "next/head";
import Header from "@/components/header";
import UserSignUpForm from "@/components/users/UserSignUpForm";
import styles from "@/styles/signup.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Signup: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("signup.title")}</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <section className={styles.section}>
          <UserSignUpForm />
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Signup;
