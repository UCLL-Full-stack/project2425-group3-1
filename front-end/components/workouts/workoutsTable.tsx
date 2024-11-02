// src/components/WorkoutsTable.tsx
import React from "react";
import styles from "@/styles/workouts.module.css";

type Workout = {
  id: number;
  name: string;
  location: string;
  time: string;
  level: string;
  muscle: string;
  muscleImage: string;
};

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
            <td>
              <button onClick={() => onShowMuscleImage(workout.muscleImage)}>
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
