import Header from "@/components/header";
import ScheduleService from "@/services/ScheduleService";
import { Schedule } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/workouts.module.css";
import WorkoutOverviewTable from "@/components/workouts/WorkoutOverviewTable";
import { scheduler } from "timers/promises";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const ScheduleById = () => {
  // const [schedule, setSchedule] = useState<Schedule | null>(null);

  const [schedules, setSchedules] = useState<Array<Schedule>>([]);

  const router = useRouter();
  const { scheduleId } = router.query;

  // const getScheduleById = async () => {
  //   const id = parseInt(scheduleId as string, 10);
  //   try {
  //     const schedeuleResponse = await ScheduleService.getScheduleById(id);
  //     const schedule = await schedeuleResponse.json();
  //     setSchedule(schedule);
  //   } catch (error) {
  //     console.log("Failed to fetch schedule", error);
  //   }
  // };

  const getScheduleById = async () => {
    const id = parseInt(scheduleId as string, 10);
    const response = await ScheduleService.getScheduleById(id);
    const schedules = await response.json();

    if (response.ok) {
      return schedules;
    }
  };

  const { data, isLoading, error } = useSWR(
    "fetchSchedulesById",
    getScheduleById
  );

  useInterval(() => {
    mutate("fetchSchedulesById", getScheduleById);
  }, 10000);

  const deleteSchedule = async (scheduleId: number) => {
    try {
      await ScheduleService.deleteSchedule(scheduleId);
      alert("Schedule deleted succesfully!");
      setSchedules((prev) =>
        prev?.filter((schedule) => schedule.id !== scheduleId)
      );
      router.push("/schedules");
    } catch (error) {
      console.error("Failed to delete schedule", error);
    }
  };

  useEffect(() => {
    if (scheduleId) getScheduleById();
  }, [scheduleId]);

  return (
    <>
      <Head>
        <title>Schedule details</title>
      </Head>
      <Header />
      <main className={styles.container}>
        {data && (
          <section className={styles.workoutSection}>
            <h2 className={styles.h2Overview}>
              Workouts planned on {new Date(data.date).toLocaleDateString()}:
            </h2>
            <WorkoutOverviewTable
              schedule={data}
              onDelete={() => deleteSchedule(data.id!)}
            />
          </section>
        )}
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

export default ScheduleById;
