export type Bmi = {
  id?: number;
  length: number;
  weight: number;
  bmiValue: number;
};

export type Goal = {
  id?: number;
  goalType: string;
};

export type Profile = {
  id?: number;
  lastName: string;
  firstName: string;
  email: string;
};

export type Schedule = {
  id?: number;
  date: Date;
  calorieBurn: number;
  totalTime: number;
  workouts: Workout[];
};

export type User = {
  id?: number;
  firstName?: string;
  lastName?: string;
  fullname?: string;
  email?: string;
  username?: string;
  password?: string;
  role?: string;
};

export type Workout = {
  id: number;
  location: string;
  level: number;
  time: number;
  name: string;
  calorie: number;
  muscle: string;
  muscleImage: string;
};

export type StatusMessage = {
  message: string;
  type: "error" | "success";
};
