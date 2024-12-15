import { Schedule } from "@/types";
import styles from "../../styles/workouts.module.css";

type Props = {
  schedule: Schedule;
  onDelete: () => void;
};

const WorkoutOverviewTable: React.FC<Props> = ({ schedule, onDelete }: Props) => {
  const handleScheduleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the schedule at ${new Date(
        schedule.date
      ).toLocaleDateString()}?`
    );
    if (confirmDelete) {
      onDelete();
    }
  };

  return (
    <>
      <table className={styles.workoutsTable}>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Calorie Burn</th>
            <th scope="col">Location</th>
            <th scope="col">Level</th>
            <th scope="col">Time</th>
            <th scope="col">Muscle</th>
          </tr>
        </thead>
        <tbody>
          {schedule.workouts.map((workout) => (
            <tr key={workout.id}>
              <td>{workout.name}</td>
              <td>{workout.calorie}</td>
              <td>{workout.location}</td>
              <td>{workout.level}</td>
              <td>{workout.time}</td>
              <td>{workout.muscle}</td>
            </tr>
          ))}
        </tbody>
      </table>
      

      <div className={styles.deleteButtonWrapper}>
        <button onClick={handleScheduleDelete} className={styles.button}>
          Delete Schedule
        </button>
      </div>
    </>
  );
};

export default WorkoutOverviewTable;
