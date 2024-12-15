import { Workout } from "@/types";

const getAllWorkouts = () => {
  const token = sessionStorage.getItem("jwtToken");

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/workouts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const addWorkoutToSchedule = (scheduleId: number, workoutsId: number[]) => {
  const token = sessionStorage.getItem("jwtToken");

  if (!token) {
    throw new Error(
      "Wtffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    );
  }
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules/addWorkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      scheduleId: scheduleId,
      workoutsId: workoutsId,
    }),
  });
};

const workoutService = {
  getAllWorkouts,
  addWorkoutToSchedule,
};

export default workoutService;
