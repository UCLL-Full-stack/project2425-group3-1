import { Schedule, Workout } from "@/types";

const getAllSchedules = () => {
  const token = sessionStorage.getItem("jwtToken");

  if (!token) {
    throw new Error("No authorization token found");
  }

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteSchedule = (scheduleId: number) => {
  const token = sessionStorage.getItem("jwtToken");

  if (!token) {
    throw new Error("No authorization token found");
  }

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules/${scheduleId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const addSchedule = (schedule: Schedule) => {
  const token = sessionStorage.getItem("jwtToken");

  if (!token) {
    throw new Error("No authorization token found");
  }

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(schedule),
  });
};


const ScheduleService = {
  getAllSchedules,
  deleteSchedule,
  addSchedule,
};

export default ScheduleService;
