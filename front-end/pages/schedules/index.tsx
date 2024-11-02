import Header from "@/components/header";
import ScheduleTable from "@/components/schedules/ScheduleTable";
import { Schedule } from "@/types";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "../../styles/workouts.module.css";
import ScheduleService from "@/services/ScheduleService";
const Schedules: React.FC = () => {
  const [schedules, setSchedules] = useState<Array<Schedule>>();

  const getSchedules = async () => {
    const response = await ScheduleService.getAllSchedules();
    const schedules = await response.json();
    setSchedules(schedules);
  };

  useEffect(() => {
    getSchedules();
  }, []);

  return (
    <>
      <Head>
        <title>Schedules</title>
      </Head>
      <Header></Header>
      <main className={styles.container}>
        <h1>Schedules</h1>
        <section>
          {schedules && <ScheduleTable schedules={schedules} />}
        </section>
      </main>
    </>
  );
};

export default Schedules;
