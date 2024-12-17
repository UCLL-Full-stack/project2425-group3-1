import React, { useState } from "react";
import styles from "../../styles/workouts.module.css";
import { Schedule } from "@/types";

type Props = {
  onAddSchedule: (newSchedule: Schedule) => void;
};

const AddScheduleForm: React.FC<Props> = ({ onAddSchedule }) => {
  const [date, setDate] = useState("");
  const [calorieBurn, setCalorieBurn] = useState<number | "">("");
  const [totalTime, setTotalTime] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || calorieBurn === "" || totalTime === "") {
      alert("All fields are required!");
      return;
    }

    const newSchedule: Schedule = {
      id: Math.random(),
      date: new Date(date),
      calorieBurn: Number(calorieBurn),
      totalTime: Number(totalTime),
      workouts: [],
    };

    onAddSchedule(newSchedule);
  };

  return (
    <form className={styles.scheduleForm} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="calorieBurn">Calorie Burn:</label>
        <input
          type="number"
          id="calorieBurn"
          value={calorieBurn}
          onChange={(e) => setCalorieBurn(Number(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="totalTime">Total Time (minutes):</label>
        <input
          type="number"
          id="totalTime"
          value={totalTime}
          onChange={(e) => setTotalTime(Number(e.target.value))}
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Add Schedule
      </button>
    </form>
  );
};

export default AddScheduleForm;
