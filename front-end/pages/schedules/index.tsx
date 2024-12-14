import Header from "@/components/header";
import ScheduleTable from "@/components/schedules/ScheduleTable";
import { Schedule } from "@/types";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "../../styles/workouts.module.css";
import ScheduleService from "@/services/ScheduleService";
import WorkoutOverviewTable from "@/components/workouts/WorkoutOverviewTable";
const Schedules: React.FC = () => {
  const [schedules, setSchedules] = useState<Array<Schedule>>();
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );

  const getSchedules = async () => {
    const response = await ScheduleService.getAllSchedules();
    const schedules = await response.json();
    setSchedules(schedules);
  };

  const deleteSchedule = async (scheduleId: number) => {
    try {
      await ScheduleService.deleteSchedule(scheduleId);
      alert("Schedule deleted succesfully!");
      console.log(`deleted schedule with id ${scheduleId}`);
      setSchedules((prev) =>
        prev?.filter((schedule) => schedule.id !== scheduleId)
      );
      setSelectedSchedule(null);
    } catch (error) {
      console.log("Failed to delete schedule", error);
      throw new Error("Error deleting schedule, try again");
    }
  };

  useEffect(() => {
    getSchedules();
  }, [schedules]);

  return (
    <>
      <Head>
        <title>Schedules</title>
      </Head>
      <Header></Header>
      <main className={styles.container}>
        <section>
          <h2 className={styles.description}>Schedules Overview</h2>
          <p className={styles.instructionText}>
            Click on a schedule in the table below to view the workouts.
          </p>
          {schedules && (
            <ScheduleTable
              schedules={schedules}
              selectedSchedule={setSelectedSchedule}
            />
          )}
        </section>
        {selectedSchedule && (
          <section>
            <h2 className={styles.description}>
              Workouts planned on{" "}
              {new Date(selectedSchedule.date).toLocaleDateString()}:
            </h2>
            <WorkoutOverviewTable
              schedule={selectedSchedule}
              onDelete={() => deleteSchedule(selectedSchedule.id!)}
            />
          </section>
        )}
      </main>
    </>
  );
};

export default Schedules;
