const getAllSchedules = () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/schedules", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const ScheduleService = {
  getAllSchedules,
};

export default ScheduleService;
