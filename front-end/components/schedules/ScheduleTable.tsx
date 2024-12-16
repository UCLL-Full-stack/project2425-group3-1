import { Schedule } from "@/types";
import styles from "../../styles/workouts.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
type Props = {
  schedules: Array<Schedule>;
  selectedSchedule: (shcedule: Schedule) => void;
};

const ScheduleTable: React.FC<Props> = ({ schedules }: Props) => {
  const router = useRouter();
  const [sessionToken, setSessionToken] = useState<String | null>(null);

  const handleDetailsButton = (scheduleId: number) => {
    router.push(`/schedules/${scheduleId}`);
  };
  return (
    <>
      {schedules && (
        <table className={styles.workoutsTable}>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Calories</th>
              <th scope="col">Time</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.id}>
                <td>{new Date(schedule.date).toLocaleDateString()}</td>
                <td>{schedule.calorieBurn}</td>
                <td>{schedule.totalTime}</td>
                <td>
                  <button onClick={() => handleDetailsButton(schedule.id!)}>
                    Details{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ScheduleTable;
