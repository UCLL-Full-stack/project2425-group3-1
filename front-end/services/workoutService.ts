import { Workout } from "@/types";

const getAllWorkouts = () => {
  // const token = sessionStorage.getItem('jwtToken');

  // if (!token) {

  //   throw new Error('No authorization token found');
  // }

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/workouts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${token}`,
    },
  });
};
const workoutService = {
  getAllWorkouts,
};

export default workoutService;
