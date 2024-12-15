import { render, screen, fireEvent } from "@testing-library/react";
import WorkoutsTable from "../components/workouts/workoutsTable";
import { Workout } from "@/types";
import '@testing-library/jest-dom';

describe('WorkoutsTable component', () => {
  const mockWorkouts: Workout[] = [
    {
      id: 1,
      name: "Morning Run",
      location: "Park",
      time: 30,
      level: 2,
      muscle: "Legs",
      muscleImage: "/images/legs.png",
      calorie: 250
    },
    {
      id: 2,
      name: "Yoga",
      location: "Studio",
      time: 15,
      level: 1,
      muscle: "Core",
      muscleImage: "/images/core.png",
      calorie: 50
    }
  ];

  const selectedWorkouts = [1]; 

  const onCheckboxChange = jest.fn();
  const onShowMuscleImage = jest.fn();

  test('renders the workouts table and checkboxes', () => {
    render(
      <WorkoutsTable 
        workouts={mockWorkouts}
        selectedWorkouts={selectedWorkouts}
        onCheckboxChange={onCheckboxChange}
        onShowMuscleImage={onShowMuscleImage}
      />
    );

    expect(screen.getByText("Morning Run")).toBeInTheDocument();
    expect(screen.getByText("Yoga")).toBeInTheDocument();


    const checkboxMorningRun = screen.getAllByRole('checkbox')[0];
    expect(checkboxMorningRun).toBeChecked();

    const checkboxYoga = screen.getAllByRole('checkbox')[1];
    expect(checkboxYoga).not.toBeChecked();
  });

  test('checkbox triggers onCheckboxChange function', () => {
    render(
      <WorkoutsTable 
        workouts={mockWorkouts}
        selectedWorkouts={selectedWorkouts}
        onCheckboxChange={onCheckboxChange}
        onShowMuscleImage={onShowMuscleImage}
      />
    );

 
    const checkboxYoga = screen.getAllByRole('checkbox')[1];
    fireEvent.click(checkboxYoga);

    expect(onCheckboxChange).toHaveBeenCalledWith(2); 
  });

  test('Show button triggers onShowMuscleImage function', () => {
    render(
      <WorkoutsTable 
        workouts={mockWorkouts}
        selectedWorkouts={selectedWorkouts}
        onCheckboxChange={onCheckboxChange}
        onShowMuscleImage={onShowMuscleImage}
      />
    );

    const showButtonMorningRun = screen.getAllByText("Show")[0];
    fireEvent.click(showButtonMorningRun);


    expect(onShowMuscleImage).toHaveBeenCalledWith("/images/legs.png");
  });
});
