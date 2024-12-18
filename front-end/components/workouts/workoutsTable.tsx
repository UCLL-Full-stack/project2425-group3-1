import React, { useState } from "react";
import styles from "@/styles/workouts.module.css";
import { Workout } from "@/types";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { json } from "stream/consumers";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

type WorkoutsTableProps = {
  workouts: Workout[];
  selectedWorkouts: number[];
  onCheckboxChange: (id: number) => void;
  onShowMuscleImage: (image: string) => void;
};
const WorkoutsTable: React.FC<WorkoutsTableProps> = ({
  workouts,
  selectedWorkouts,
  onCheckboxChange,
  onShowMuscleImage,
}) => {
  const { t } = useTranslation();
  const [sessionToken, setSessionToken] = useState<String | null>(null);
  const router = useRouter();

  return (
    <>
      <h1 className={styles.h1}>{t("workouts.title")}</h1>
      <p className={styles.instructionText}>
        {t("workouts.showMuscleImageMessage")}
      </p>

      <table className={styles.workoutsTable}>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Location</th>
            <th>Time</th>
            <th>Level</th>
            <th>Muscle</th>
            <th>Muscle Image</th>
          </tr>
        </thead>
        <tbody>
          {workouts &&
            workouts.map((workout) => (
              <tr key={workout.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedWorkouts.includes(workout.id)}
                    onChange={() => onCheckboxChange(workout.id)}
                  />
                </td>
                <td>{workout.name}</td>
                <td>{workout.location}</td>
                <td>{workout.time}</td>
                <td>{workout.level}</td>
                <td>{workout.muscle}</td>
                <td>
                  <button
                    onClick={() => onShowMuscleImage(workout.muscleImage)}
                    className={styles.showButton}
                  >
                    Show
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default WorkoutsTable;
