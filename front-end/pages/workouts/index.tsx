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

const Workouts: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [workoutsData, setWorkoutsData] = useState<Workout[]>([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState<number[]>([]);
  const [selectedMuscleImage, setSelectedMuscleImage] = useState<string | null>(
    null
  );
  const [schedulesData, setSchedulesData] = useState<Schedule[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const [loading, setLoading] = useState<Boolean>(false);

  // voor router push te laten werken
  const router = useRouter();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await workoutService.getAllWorkouts();
      const workouts = await response.json();
      setWorkoutsData(workouts);
    };

    const fetchSchedules = async () => {
      const response = await ScheduleService.getAllSchedules();
      const schedules = await response.json();
      setSchedulesData(schedules);
    };

    fetchWorkouts();
    fetchSchedules();
  }, []);

  const handleCheckboxChange = (id: number) => {
    setSelectedWorkouts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((workoutId) => workoutId !== id)
        : [...prevSelected, id]
    );
  };
  const handleAddToSchedule = async () => {
    if (!selectedSchedule) {
      setMessage("Please select a Schedule");
      return;
    }

    setLoading(true);
    // const token = localStorage.getItem('jwtToken');

    // if (!token) {
    //   setMessage("No authorization token found.");
    //   setLoading(false);
    //   return;
    // }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/schedules/addWorkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            scheduleId: selectedSchedule.id,
            workoutsId: selectedWorkouts,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add workout to the selected schedule");
      }

      const data = await response.json();
      setMessage(data.message);

      setTimeout(() => {
        router.push("/schedules");
      }, 2000);
    } catch (error) {
      setMessage("Error adding workout to schedule");
    } finally {
      setLoading(false);
    }
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
        <title>Workouts</title>
      </Head>
      <Header />
      <div className={styles.content}>
        <h1>Workouts</h1>
        <WorkoutsTable
          workouts={workoutsData}
          selectedWorkouts={selectedWorkouts}
          onCheckboxChange={handleCheckboxChange}
          onShowMuscleImage={handleShowMuscleImage}
        />
      </div>
      <div className={styles.imageSection}>
        {selectedMuscleImage ? (
          <Image
            src={selectedMuscleImage}
            alt="Muscle Group"
            className={styles.image}
            width={200}
            height={200}
          />
        ) : (
          <p>Click on 'show' to view a picture of the muscle group</p>
        )}
      </div>
      <p className={styles.p}>
        Select the schedule you want the workout to be in:
      </p>
      <div className={styles.dropDown}>
        <ScheduleDropdown
          schedules={schedulesData}
          selectedSchedule={selectedSchedule}
          onChange={handleScheduleChange}
        ></ScheduleDropdown>
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
          Add to Schedule
        </button>
        <div>{message && <p className={styles.p}>{message}</p>}</div>
      </div>
    </div>
  );
};

export default Workouts;
