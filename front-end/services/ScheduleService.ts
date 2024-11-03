import { Workout } from "@/types";

const getAllSchedules = () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/schedules", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const addWorkoutsToSchedule = (scheduleId: number, workouts: Workout[]) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules/add/${scheduleId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workouts),
  });
};

const ScheduleService = {
  getAllSchedules,
  addWorkoutsToSchedule,
};

export default ScheduleService
