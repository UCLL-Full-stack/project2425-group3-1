import Head from "next/head";
import Header from "@/components/header";
import UserLoginForm from "@/components/users/UserLoginForm";
import styles from "@/styles/login.module.css"; 
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Login: React.FC = () => {
    const { t } = useTranslation(); 
    return (
        <>
            <Head>
                <title>{t("login.title")}</title>
            </Head>
            <Header />
            <main className={styles.main}>
                <section className={styles.section}> 
                    <UserLoginForm />
                </section>
            </main>
        </>
    );
};


export const getServerSideProps = async (context) => { // in prerender fase gecalled, laadt sowieso alle talen 
    const { locale} = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),

        },
    };
};

export default Login;
