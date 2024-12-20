import { Schedule } from "@/types";
import styles from "../../styles/workouts.module.css";

type Props = {
  schedules: Schedule[];
  selectedSchedule: Schedule | null;
  onChange: (schedule: Schedule) => void;
};

const ScheduleDropdown: React.FC<Props> = ({
  schedules,
  selectedSchedule,
  onChange,
}) => {
  if (!schedules || schedules.length === 0) {
    return <p className={styles.p}>No schedules are available</p>;
  }

  return (
    <select
      value={selectedSchedule?.id || ""}
      onChange={(event) => {
        const selectedId = Number(event.target.value);
        const selected = schedules.find(
          (schedule) => schedule.id === selectedId
        );
        if (selected) {
          onChange(selected);
        }
      }}
    >
      <option value="" disabled>
        select a schedule
      </option>
      {schedules.map((schedule) => (
        <option key={schedule.id} value={schedule.id}>
          {new Date(schedule.date).toLocaleDateString()}
        </option>
      ))}
    </select>
  );
};

export default ScheduleDropdown;
