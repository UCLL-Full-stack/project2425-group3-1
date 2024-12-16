import BmiService from "@/services/BmiService";
import UserService from "@/services/UserService";
import Head from "next/head";
import Header from "@/components/header";
import styles from "../../styles/users.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";

import { useEffect, useState } from "react";
import UserDataTable from "@/components/users/UserDataTable";
import BmiDataTable from "@/components/bmi/BmiDataTable";
import RoleErrorMessage from "@/components/error/RoleErrorMessage";
const usersData: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchRoleAndData = async () => {
      const userRole = sessionStorage.getItem("userRole");
      console.log("Fetched user role:", userRole);

      setUserRole(userRole);

      if (userRole) {
        await fetchData(userRole);
      }
    };

    fetchRoleAndData();
  }, []);

  const fetchData = async (role: string) => {
    try {
      const response = await BmiService.getDataForRole();
      const result = await response.json();
      console.log("Fetched data:", result.data);
      setData(result.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>User Data</title>
      </Head>
      <Header />
      <main className={styles.container}>
        {userRole === "admin" && data && (
          <section>
            <UserDataTable users={data} />
          </section>
        )}
        {userRole === "trainer" && data && (
          <section>
            <BmiDataTable bmis={data} />
          </section>
        )}

        {userRole === "user" && <RoleErrorMessage></RoleErrorMessage>}
      </main>
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

export default usersData;
