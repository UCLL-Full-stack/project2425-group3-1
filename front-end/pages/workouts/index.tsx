
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/workouts.module.css";
import classNames from "classnames";
import Header from "@/components/header";
import WorkoutsTable from "@/components/workouts/workoutsTable";
import { Workout } from "@/types"; 
import workoutService from "@/services/workoutService";
import Head from "next/head";

const Workouts: React.FC = () => {
  const [workoutsData, setWorkoutsData] = useState<Workout[]>([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState<number[]>([]);
  const [selectedMuscleImage, setSelectedMuscleImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
        const response = await workoutService.getAllWorkouts();
        const workouts = await response.json();
        setWorkoutsData(workouts);
    };

    fetchWorkouts();
  }, []);

  const handleCheckboxChange = (id: number) => {
    setSelectedWorkouts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((workoutId) => workoutId !== id)
        : [...prevSelected, id]
    );
  };

  const handleAddToSchedule = () => {
    if (selectedWorkouts.length > 0) {
      console.log("Added to schedule:", selectedWorkouts);
      setSelectedWorkouts([]);
    }
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
            width={300}
            height={300}
          />
        ) : (
          <p>Select a workout to view the muscle group</p>
        )}
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
      </div>
    </div>
  );
};

export default Workouts;
