import BmiService from "@/services/BmiService";
import UserService from "@/services/UserService";
import Head from "next/head";
import Header from "@/components/header";
import styles from "../../styles/users.module.css";

import { useEffect, useState } from "react";
import UserDataTable from "@/components/users/UserDataTable";
const usersData: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

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
      </main>
    </>
  );
};

export default usersData;
