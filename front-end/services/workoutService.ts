const getAllWorkouts = () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/workouts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const workoutService = {
  getAllWorkouts,
};

export default workoutService;
