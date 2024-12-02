import Head from "next/head";
import Header from "@/components/header";
import UserLoginForm from "@/components/users/UserLoginForm";
import styles from "@/styles/login.module.css"; 

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>User Signup</title>
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

export default Login;
