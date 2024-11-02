// src/pages/workouts.tsx
import React, { useState } from "react";
import Image from "next/image";
import styles from "../../styles/workouts.module.css";
import classNames from "classnames";
import Header from "@/components/header";

type Workout = {
  id: number;
  name: string;
  location: string;
  time: string;
  level: string;
  muscle: string;
  muscleImage: string;
};

const workoutsData: Workout[] = [
  {
    id: 1,
    name: "Yoga",
    location: "Studio 1",
    time: "10:00 AM",
    level: "Beginner",
    muscle: "Core",
    muscleImage: "/images/core.png",
  },
  {
    id: 2,
    name: "HIIT",
    location: "Gym",
    time: "12:00 PM",
    level: "Intermediate",
    muscle: "Full Body",
    muscleImage: "/images/fullbody.png",
  },
  {
    id: 3,
    name: "Pilates",
    location: "Studio 2",
    time: "2:00 PM",
    level: "Advanced",
    muscle: "Legs",
    muscleImage: "/images/legs.png",
  },
];

const Workouts: React.FC = () => {
  const [selectedWorkouts, setSelectedWorkouts] = useState<number[]>([]);
  const [selectedMuscleImage, setSelectedMuscleImage] = useState<string | null>(
    null
  );

  const handleCheckboxChange = (id: number) => {
    setSelectedWorkouts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((workoutId) => workoutId !== id)
        : [...prevSelected, id]
    );
  };

  const handleAddToSchedule = () => {
    if (selectedWorkouts.length > 0) {
      console.log("Toegevoegd aan schema:", selectedWorkouts);
      setSelectedWorkouts([]);
    }
  };

  const handleShowMuscleImage = (image: string) => {
    setSelectedMuscleImage(image);
  };

  return (
    <div className={styles.container}>
      <Header /> {/* Using the Header component here */}
      <div className={styles.content}>
        <h1>Workouts</h1>
        <table className={styles.workoutsTable}>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Location</th>
              <th>Time</th>
              <th>Level</th>
              <th>Muscle</th>
            </tr>
          </thead>
          <tbody>
            {workoutsData.map((workout) => (
              <tr key={workout.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedWorkouts.includes(workout.id)}
                    onChange={() => handleCheckboxChange(workout.id)}
                  />
                </td>
                <td>{workout.name}</td>
                <td>{workout.location}</td>
                <td>{workout.time}</td>
                <td>{workout.level}</td>
                <td>
                  <button
                    onClick={() => handleShowMuscleImage(workout.muscleImage)}
                  >
                    Show
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
          <p>Selecteer een workout om de spiergroep te bekijken</p>
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
