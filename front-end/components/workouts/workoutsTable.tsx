import React from "react";
import styles from "@/styles/workouts.module.css";
import { Workout } from "@/types";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
  const router = useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    if (!token) {
      alert("You are not logged in, redirecting...");
      router.push("/login");
    }
  }, [router]);

  return (
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
        {workouts.map((workout) => (
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
  );
};

export default WorkoutsTable;
