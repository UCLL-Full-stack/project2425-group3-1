import { Schedule } from "@/types";
import styles from "../../styles/workouts.module.css";
type Props = {
  schedules: Array<Schedule>;
  selectedSchedule: (shcedule: Schedule) => void;
};

const ScheduleTable: React.FC<Props> = ({
  schedules,
  selectedSchedule,
}: Props) => {
  return (
    <>
      {schedules && (
        <table className={styles.workoutsTable}>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Calories</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule, index) => (
              <tr
                key={index}
                onClick={() => selectedSchedule(schedule)}
                role="button"
              >
                <td>{new Date(schedule.date).toLocaleDateString()}</td>
                <td>{schedule.calorieBurn}</td>
                <td>{schedule.totalTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ScheduleTable;
