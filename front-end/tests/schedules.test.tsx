import { render, screen } from "@testing-library/react";
import ScheduleTable from "../components/schedules/ScheduleTable"; 
import { Schedule } from "@/types"; 
import '@testing-library/jest-dom';

jest.mock("../services/ScheduleService");

describe('given schedules - when you want to see the overview of the schedules', () => {
  const mockSchedules: Schedule[] = [
    {
      id: 1,
      date: new Date("2024-12-15"),
      calorieBurn: 300,
      totalTime: 45,
      workouts: [], 
    },
    {
      id: 2,
      date: new Date("2024-12-16"),
      calorieBurn: 400,
      totalTime: 60,
      workouts: [], 
    },
  ];

  test('renders the schedule overview', () => {
    render(<ScheduleTable schedules={mockSchedules} selectedSchedule={() => {}} />);

 
    expect(screen.getByText("15/12/2024")).toBeInTheDocument();
    expect(screen.getByText("16/12/2024")).toBeInTheDocument();
  });

  test('should display total calories and time for each schedule', () => {
    render(<ScheduleTable schedules={mockSchedules} selectedSchedule={() => {}} />);

    expect(screen.getByText("300")).toBeInTheDocument();
    expect(screen.getByText("45")).toBeInTheDocument();
    expect(screen.getByText("400")).toBeInTheDocument();
    expect(screen.getByText("60")).toBeInTheDocument();
  });
});
