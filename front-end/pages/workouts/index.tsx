import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/workouts.module.css";
import classNames from "classnames";
import Header from "@/components/header";
import WorkoutsTable from "@/components/workouts/workoutsTable";
import { Schedule, Workout } from "@/types";
import workoutService from "@/services/workoutService";
import Head from "next/head";
import ScheduleService from "@/services/ScheduleService";
import { useRouter } from "next/router";
import ScheduleDropdown from "@/components/workouts/ScheduleDropdown";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import AuthErrorMessage from "@/components/error/AuthErrorMessage";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const Workouts: React.FC = () => {
  const { t } = useTranslation();
  const [message, setMessage] = useState<string | null>(null);
  // const [workoutsData, setWorkoutsData] = useState<Workout[]>([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState<number[]>([]);
  const [selectedMuscleImage, setSelectedMuscleImage] = useState<string | null>(
    null
  );
  // const [schedulesData, setSchedulesData] = useState<Schedule[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const [loading, setLoading] = useState<Boolean>(false);
  const [sessionToken, setSessionToken] = useState<String | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      setSessionToken(sessionStorage.getItem("jwtToken")!);
    };
    fetchToken();
  }, []);
  const getWorkoutsAndSchedules = async () => {
    const responses = await Promise.all([
      workoutService.getAllWorkouts(),
      ScheduleService.getAllSchedules(),
    ]);

    const [workoutsResponse, scheduleResponse] = responses;

    if (workoutsResponse.ok && scheduleResponse.ok) {
      const workouts = await workoutsResponse.json();
      const schedules = await scheduleResponse.json();
      return { workouts, schedules };
    }
  };

  const { data, isLoading, error } = useSWR(
    "workoutsAndStudents",
    getWorkoutsAndSchedules
  );

  useInterval(() => {
    mutate("workoutsAndStudents", getWorkoutsAndSchedules());
  }, 3000);

  const handleCheckboxChange = (id: number) => {
    setSelectedWorkouts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((workoutId) => workoutId !== id)
        : [...prevSelected, id]
    );
  };

  const handleAddToSchedule = async () => {
    if (!selectedSchedule) {
      setMessage(t("workouts.selectSchedule"));
      return;
    }
    setLoading(true);
    const token = sessionStorage.getItem("jwtToken");
    if (!token) {
      setMessage(t("workouts.noToken"));
      setLoading(false);
      return;
    }
    workoutService.addWorkoutToSchedule(selectedSchedule.id!, selectedWorkouts);
    setTimeout(() => {
      router.push("/schedules");
    }, 1000);
  };

  const handleScheduleChange = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
  };

  const handleShowMuscleImage = (image: string) => {
    setSelectedMuscleImage(image);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{t("workouts.title")}</title>
      </Head>
      <Header />

      {!sessionToken ? (
        <AuthErrorMessage />
      ) : (
        <>
          <div className={styles.content}>
            <WorkoutsTable
              workouts={data?.workouts}
              selectedWorkouts={selectedWorkouts}
              onCheckboxChange={handleCheckboxChange}
              onShowMuscleImage={handleShowMuscleImage}
            />
          </div>
          <div className={styles.imageSection}>
            {selectedMuscleImage && (
              <Image
                src={selectedMuscleImage}
                alt={t("workouts.showMuscleImageMessage")}
                className={styles.image}
                width={200}
                height={200}
              />
            )}
          </div>
          <p className={styles.pWorkouts}>
            {t("workouts.selectScheduleMessage")}
          </p>
          <div className={styles.dropDown}>
            <ScheduleDropdown
              schedules={data?.schedules}
              selectedSchedule={selectedSchedule}
              onChange={handleScheduleChange}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={classNames(
                styles.button,
                selectedWorkouts.length > 0
                  ? styles.activeButton
                  : styles.inactiveButton
              )}
              onClick={handleAddToSchedule}
              disabled={selectedWorkouts.length === 0}
            >
              {t("workouts.addToSchedule")}
            </button>
            <div>{message && <p className={styles.p}>{message}</p>}</div>
          </div>
          <div>{error && <p>{error.message}</p>}</div>
        </>
      )}
    </div>
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

export default Workouts;
