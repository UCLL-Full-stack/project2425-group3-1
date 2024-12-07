import Head from "next/head";
import Header from "@/components/header";
import styles from "@/styles/signup.module.css";
import UserSignUpForm from "@/components/users/UserSignUpForm";

const Signup: React.FC = () => {
  return (
    <>
      <Head>
        <title>User Signup</title>
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

export default Signup;
