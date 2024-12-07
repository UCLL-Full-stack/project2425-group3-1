import { Workout } from "@/types";

const getAllSchedules = () => {
  const token = localStorage.getItem('jwtToken'); 

  if (!token) {

    throw new Error('No authorization token found');
  }

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, 
    },
  });
};

const addWorkoutsToSchedule = (scheduleId: number, workouts: Workout[]) => {
  const token = localStorage.getItem('jwtToken'); 
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules/add/${scheduleId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(workouts),
  });
};

const ScheduleService = {
  getAllSchedules,
  addWorkoutsToSchedule,
};

export default ScheduleService
