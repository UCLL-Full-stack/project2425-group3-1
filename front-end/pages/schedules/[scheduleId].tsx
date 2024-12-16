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

const ScheduleById = () => {
  const [schedule, setSchedule] = useState<Schedule | null>(null);

  const [schedules, setSchedules] = useState<Array<Schedule>>([]);

  const router = useRouter();
  const { scheduleId } = router.query;

  const getScheduleById = async () => {
    const id = parseInt(scheduleId as string, 10);
    try {
      const schedeuleResponse = await ScheduleService.getScheduleById(id);
      const schedule = await schedeuleResponse.json();
      setSchedule(schedule);
    } catch (error) {
      console.log("Failed to fetch schedule", error);
    }
  };

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
        {schedule && (
          <section className={styles.workoutSection}>
            <h2 className={styles.description}>
              Workouts planned on {new Date(schedule.date).toLocaleDateString()}
              :
            </h2>
            <WorkoutOverviewTable
              schedule={schedule}
              onDelete={() => deleteSchedule(schedule.id!)}
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
