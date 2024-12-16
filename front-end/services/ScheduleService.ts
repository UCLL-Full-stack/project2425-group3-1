import { Schedule, Workout } from "@/types";
import { useRouter } from "next/router";

const getAllSchedules = () => {
  const token = sessionStorage.getItem("jwtToken");

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const getScheduleById = (scheduleId: number) => {
  const token = sessionStorage.getItem("jwtToken");

  if (!token) {
    throw new Error("No authorization token found");
  }

  if (!token) {
    alert(
      "You must be logged in to access this page, redirecting to login now!"
    );
  }

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules/${scheduleId}`, {
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
  getScheduleById,
};

export default ScheduleService;
