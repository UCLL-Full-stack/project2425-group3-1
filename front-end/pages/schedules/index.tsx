import Header from "@/components/header";
import ScheduleTable from "@/components/schedules/ScheduleTable";
import { Schedule } from "@/types";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "../../styles/workouts.module.css";
import ScheduleService from "@/services/ScheduleService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import AddScheduleForm from "@/components/schedules/AddScheduleForm";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import AuthErrorMessage from "@/components/error/AuthErrorMessage";

const Schedules: React.FC = () => {
  const { t } = useTranslation();
  const [schedules, setSchedules] = useState<Array<Schedule>>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const [showAddForm, setShowAddForm] = useState(false);

  const router = useRouter();
  const [sessionToken, setSessionToken] = useState<String | null>(null);

  const handleAddSchedule = async (newSchedule: Schedule) => {
    try {
      const response = await ScheduleService.addSchedule(newSchedule);
      const createdSchedule = await response.json();
      setSchedules((prev) => [...prev, createdSchedule]);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding schedule", error);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      setSessionToken(sessionStorage.getItem("jwtToken")!);
    };
    fetchToken();

    const getSchedules = async () => {
      const response = await ScheduleService.getAllSchedules();
      const schedules = await response.json();
      setSchedules(schedules);
    };

    getSchedules();
  }, [schedules]);

  return (
    <>
      <Head>
        <title>Schedules</title>
      </Head>
      <Header />
      <main className={styles.container}>
        {!sessionToken ? (
          <AuthErrorMessage />
        ) : (
          <section className={styles.scheduleOverviewSection}>
            <h2 className={styles.ScheduleDescription}>Schedules Overview</h2>
            <p className={styles.instructionText}>
              Click on the details button to see your planned workouts.
            </p>
            {schedules && (
              <ScheduleTable
                schedules={schedules}
                selectedSchedule={setSelectedSchedule}
              />
            )}
            <button
              className={showAddForm ? styles.cancelButton : styles.addButton}
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? "Cancel" : "Add Schedule"}
            </button>
            {showAddForm && (
              <AddScheduleForm onAddSchedule={handleAddSchedule} />
            )}
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

export default Schedules;
